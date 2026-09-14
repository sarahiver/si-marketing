// src/components/blog/WeddingWebsiteCTA.js
// EINE wiederverwendbare Conversion-Komponente für alle Blog-Artikel.
//
// Varianten (inhaltlich, aus ctaConfig.js): inspiration | planning |
//   high_intent | playful
// Platzierungen: 'hint' (kurzer Satz nach dem ersten Abschnitt),
//   'mid' (Box im Artikel), 'end' (größerer Conversion-Block)
//
// Design folgt exakt den bestehenden Blog-Theme-Helfern (blogTheme.js),
// benutzt ausschließlich vorhandene Demo-Assets (demoData.js) und bringt
// keine neue Dependency mit. Kein Popup, keine Urgency, keine Sales-Sprache.
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  getTextColor, getSecondaryText, getAccent, getCardBg, getCardBorder,
  getHeadlineFont, getBodyFont,
} from './blogTheme';
import { demoUrl, phoneCardUrl, trackDemoClick } from '../marketing/demoData';
import { getCTAVariant, getContextLinks } from '../../content/blog/ctaConfig';
import {
  trackWeddingCTAView, trackWeddingCTAClick, trackInquiryClick, setFunnelOrigin,
} from '../../utils/analytics';

// Drei Demo-Screens für den Block am Artikelende (vorhandene Cloudinary-Assets)
const END_PREVIEW_THEMES = ['classic', 'editorial', 'botanical'];

// ============================================
// STYLED
// ============================================
const Hint = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.92rem;
  line-height: 1.7;
  color: ${p => getSecondaryText(p.$theme)};
  margin: 1.75rem 0;
  padding-left: 1rem;
  border-left: 2px solid ${p => getAccent(p.$theme)};

  a {
    color: ${p => getTextColor(p.$theme)};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: ${p => getAccent(p.$theme)};
    cursor: pointer;
    &:hover { opacity: 0.7; }
  }
`;

const Box = styled.div`
  margin: ${p => (p.$placement === 'end' ? '0 auto 3rem' : '3rem 0')};
  max-width: ${p => (p.$placement === 'end' ? '700px' : 'none')};
  padding: ${p => (p.$placement === 'end' ? '2.5rem' : '2rem')};
  background: ${p => getCardBg(p.$theme)};
  border: ${p => (p.$theme === 'contemporary' ? '3px solid #0D0D0D' : `1px solid ${getCardBorder(p.$theme)}`)};
  border-left: ${p => (p.$theme === 'contemporary' ? '3px solid #0D0D0D' : `4px solid ${getAccent(p.$theme)}`)};
  border-radius: ${p => (p.$theme === 'botanical' ? '16px' : '0')};

  ${p => p.$theme === 'contemporary' && css` box-shadow: 6px 6px 0 #0D0D0D; `}
  ${p => p.$theme === 'botanical' && css` backdrop-filter: blur(40px); `}
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.$withVisual ? '1fr 120px' : '1fr')};
  gap: 1.75rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const Eyebrow = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => getAccent(p.$theme)};
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: ${p => (p.$placement === 'end' ? '1.5rem' : '1.3rem')};
  font-weight: ${p => (['botanical', 'luxe'].includes(p.$theme) ? '400' : '700')};
  color: ${p => getTextColor(p.$theme)};
  line-height: 1.25;
  margin-bottom: 0.75rem;

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
`;

const Text = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${p => getSecondaryText(p.$theme)};
  margin-bottom: 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  color: ${p => getTextColor(p.$theme)};
  background: transparent;
  border: 2px solid ${p => getAccent(p.$theme)};
  border-radius: ${p => (p.$theme === 'botanical' ? '99px' : '0')};

  &:hover {
    background: ${p => getAccent(p.$theme)};
    color: ${p => (['botanical', 'luxe', 'neon', 'video'].includes(p.$theme) ? '#0A0A0A' : '#FFFFFF')};
  }

  @media (max-width: 480px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const SecondaryLink = styled.a`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.88rem;
  font-weight: 500;
  color: ${p => getSecondaryText(p.$theme)};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover { color: ${p => getTextColor(p.$theme)}; }

  @media (max-width: 480px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const Visual = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Phone = styled.img`
  width: 110px;
  aspect-ratio: 9 / 19;
  object-fit: cover;
  object-position: top center;
  border-radius: 14px;
  border: 1px solid ${p => getCardBorder(p.$theme)};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: block;
`;

const PhoneRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;

  img:nth-child(1) { transform: rotate(-3deg) translateY(6px); }
  img:nth-child(3) { transform: rotate(3deg) translateY(6px); }

  @media (max-width: 640px) {
    gap: 0.5rem;
    img { width: 84px; }
    img:nth-child(3) { display: none; }
  }
`;

const ContextLinks = styled.div`
  margin: 0 auto 2rem;
  max-width: 700px;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
  color: ${p => getSecondaryText(p.$theme)};

  span { display: block; margin-bottom: 0.5rem; }

  a {
    color: ${p => getTextColor(p.$theme)};
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: ${p => getAccent(p.$theme)};
    &:hover { opacity: 0.7; }
  }

  li { margin-bottom: 0.35rem; list-style: none; }
`;

// ============================================
// VIEW-TRACKING (einmal pro Platzierung)
// ============================================
const useViewTracking = (ref, payload) => {
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !fired.current) {
        fired.current = true;
        trackWeddingCTAView(payload);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, payload.article, payload.placement]);
};

// ============================================
// KOMPONENTE
// ============================================
const WeddingWebsiteCTA = ({ slug, theme, placement = 'mid' }) => {
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const variant = getCTAVariant(slug);
  const [visualFailed, setVisualFailed] = useState(false);

  useViewTracking(boxRef, { article: slug, variant: variant.id, placement });

  // Gemeinsames Verhalten für jeden CTA-Klick
  const handleAction = (action, e) => {
    const { target } = action;
    setFunnelOrigin({ article: slug, variant: variant.id, placement, target });
    trackWeddingCTAClick({ article: slug, variant: variant.id, placement, target });

    if (target === 'demo') {
      // externer Link → Default-Verhalten (neuer Tab), nur zusätzlich tracken
      trackDemoClick(variant.demoTheme, demoUrl(variant.demoTheme, { placement: `blog_${placement}`, article: slug }), `blog_${placement}`, slug);
      return;
    }

    e.preventDefault();

    if (target === 'contact') {
      trackInquiryClick({ article: slug, variant: variant.id, placement });
    }

    const hash = target === 'contact' ? 'contact' : 'themes';

    if (theme === 'modern') {
      // Modern-Theme öffnet Sektionen als Modal (gleiches Muster wie MarketingNav)
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('modernOpenModal', {
          detail: { id: target === 'contact' ? 'contact' : 'designs' },
        }));
      }, 400);
      return;
    }

    navigate(`/#${hash}`);
  };

  const hrefFor = (action) => {
    if (action.target === 'demo') return demoUrl(variant.demoTheme, { placement: `blog_${placement}`, article: slug });
    return action.target === 'contact' ? '/#contact' : '/#themes';
  };

  const externalProps = (action) =>
    action.target === 'demo' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  // --- Platzierung A: kurzer Hinweis nach dem ersten Abschnitt ---
  if (placement === 'hint') {
    if (!variant.hint) return null;
    const action = { target: variant.hint.target };
    return (
      <Hint ref={boxRef} $theme={theme}>
        {variant.hint.text}{' '}
        <a
          href={hrefFor(action)}
          {...externalProps(action)}
          onClick={(e) => handleAction(action, e)}
        >
          {variant.hint.label} →
        </a>
      </Hint>
    );
  }

  const showVisual = placement === 'mid' && !visualFailed && Boolean(phoneCardUrl(variant.demoTheme));
  const contextLinks = placement === 'end' ? getContextLinks(slug) : [];

  return (
    <>
      {placement === 'end' && contextLinks.length > 0 && (
        <ContextLinks $theme={theme}>
          <span>Passend zum Thema:</span>
          <ul>
            {contextLinks.map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </ContextLinks>
      )}

      <Box ref={boxRef} $theme={theme} $placement={placement}>
        {placement === 'end' && (
          <PhoneRow>
            {END_PREVIEW_THEMES.map(id => phoneCardUrl(id) && (
              <Phone
                key={id}
                src={phoneCardUrl(id)}
                alt={`Hochzeitswebsite Design ${id}`}
                loading="lazy"
                $theme={theme}
              />
            ))}
          </PhoneRow>
        )}

        <Inner $withVisual={showVisual}>
          <div>
            <Eyebrow $theme={theme}>{variant.eyebrow}</Eyebrow>
            <Title $theme={theme} $placement={placement}>{variant.title}</Title>
            <Text $theme={theme}>{variant.text}</Text>
            <Actions>
              <PrimaryButton
                href={hrefFor(variant.primary)}
                {...externalProps(variant.primary)}
                $theme={theme}
                onClick={(e) => handleAction(variant.primary, e)}
              >
                {variant.primary.label}
              </PrimaryButton>
              {variant.secondary && (
                <SecondaryLink
                  href={hrefFor(variant.secondary)}
                  {...externalProps(variant.secondary)}
                  $theme={theme}
                  onClick={(e) => handleAction(variant.secondary, e)}
                >
                  {variant.secondary.label}
                </SecondaryLink>
              )}
            </Actions>
          </div>

          {showVisual && (
            <Visual>
              <Phone
                src={phoneCardUrl(variant.demoTheme)}
                alt={`S&I. Hochzeitswebsite Design ${variant.demoTheme}`}
                loading="lazy"
                $theme={theme}
                onError={() => setVisualFailed(true)}
              />
            </Visual>
          )}
        </Inner>
      </Box>
    </>
  );
};

export default WeddingWebsiteCTA;
