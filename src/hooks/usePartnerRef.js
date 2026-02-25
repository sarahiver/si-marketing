// src/hooks/usePartnerRef.js
// Partner-Referral Tracking Hook
// Liest ?ref=slug aus der URL, speichert im SessionStorage, trackt Visit via API
// Beispiel: siwedding.de/?ref=hochzeitsplaza → speichert "hochzeitsplaza"

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'si_partner_ref';
const STORAGE_CODE_KEY = 'si_partner_coupon';
const TRACKED_KEY = 'si_partner_tracked';

// Supabase REST API (anon key, public read auf partner_codes)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

/**
 * Löst den Partner-Slug auf und gibt den Gutscheincode zurück.
 * Trackt den Visit einmalig pro Session.
 */
export default function usePartnerRef() {
  const [partnerRef, setPartnerRef] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });
  const [couponCode, setCouponCode] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_CODE_KEY) || null; } catch { return null; }
  });

  useEffect(() => {
    // 1. Check URL for ?ref= parameter
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');

    if (ref) {
      // Neuer Ref-Parameter → speichern + alte Daten überschreiben
      try {
        sessionStorage.setItem(STORAGE_KEY, ref);
        sessionStorage.removeItem(TRACKED_KEY); // Re-track bei neuem Ref
      } catch { /* SessionStorage not available */ }
      setPartnerRef(ref);
      resolveAndTrack(ref);
    } else if (partnerRef) {
      // Bestehender Ref aus SessionStorage → nur auflösen wenn nötig
      if (!couponCode) {
        resolveAndTrack(partnerRef);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function resolveAndTrack(slug) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    try {
      // Partner-Code auflösen
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/partner_codes?ref_slug=eq.${encodeURIComponent(slug)}&is_active=eq.true&select=id,code,partner_name,discount_amount,discount_percent`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!res.ok) return;
      const data = await res.json();
      if (!data.length) return;

      const partner = data[0];
      const code = partner.code;

      // Coupon speichern
      try {
        sessionStorage.setItem(STORAGE_CODE_KEY, code);
      } catch { /* */ }
      setCouponCode(code);

      // Visit tracken (einmalig pro Session)
      let alreadyTracked = false;
      try { alreadyTracked = sessionStorage.getItem(TRACKED_KEY) === slug; } catch { /* */ }

      if (!alreadyTracked) {
        // Fire-and-forget Visit-Tracking
        fetch(`${SUPABASE_URL}/rest/v1/partner_visits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            partner_code_id: partner.id,
            ref_slug: slug,
            landing_page: window.location.pathname,
            referrer: document.referrer || null,
          }),
        }).catch(() => { /* Silent fail */ });

        try { sessionStorage.setItem(TRACKED_KEY, slug); } catch { /* */ }
      }
    } catch (err) {
      console.warn('Partner ref tracking error:', err);
    }
  }

  // Clean URL: remove ?ref= after storing (optional, keeps URL clean)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('ref')) {
      params.delete('ref');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return { partnerRef, couponCode };
}
