// src/components/blog/BlogArticle.js
// Einzelner Blog-Artikel mit Theme-Support + einfacher Markdown-Rendering
import React, { useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getPostBySlug, getAllPosts } from '../../content/blog/blogPosts';
import MarketingNav from '../marketing/MarketingNav';
import MarketingFooter from '../marketing/MarketingFooter';
import BotanicalLeaves from '../marketing/BotanicalLeaves';
import SEOHead from '../shared/SEOHead';
import WeddingWebsiteCTA from './WeddingWebsiteCTA';
import {
  getBackground, getTextColor, getSecondaryText, getAccent,
  getCardBg, getCardBorder, getHeadlineFont, getBodyFont,
} from './blogTheme';
import { trackBlogArticleView, trackBlogScrollDepth } from '../../utils/analytics';

// THEME HELPERS liegen jetzt zentral in blogTheme.js (siehe Import oben),
// damit Artikel und WeddingWebsiteCTA garantiert dasselbe Design benutzen.

// ============================================
// SIMPLE MARKDOWN RENDERER
// ============================================
const renderMarkdown = (content, theme, slug) => {
  if (!content) return null;
  
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;
  let tableRows = [];
  let inTable = false;

  const processInline = (text) => {
    return text
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: ' + getAccent(theme) + '; text-decoration: underline; text-underline-offset: 2px;">$1</a>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    // Empty lines
    if (!line) {
      if (inTable) {
        elements.push({ type: 'table', rows: [...tableRows] });
        tableRows = [];
        inTable = false;
      }
      i++;
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push({ type: 'image', alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    // Table rows
    if (line.startsWith('|') && line.endsWith('|')) {
      // Skip separator rows
      if (line.match(/^\|[\s\-:|]+\|$/)) { i++; continue; }
      const cells = line.split('|').filter(Boolean).map(c => c.trim());
      tableRows.push(cells);
      inTable = true;
      i++;
      continue;
    } else if (inTable) {
      elements.push({ type: 'table', rows: [...tableRows] });
      tableRows = [];
      inTable = false;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push({ type: 'h3', text: line.slice(4) });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', text: line.slice(3) });
    }
    // List items
    else if (line.startsWith('- ')) {
      const listItems = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++;
        listItems.push(lines[i].trim().slice(2));
      }
      elements.push({ type: 'list', items: listItems });
    }
    // Paragraph
    else {
      elements.push({ type: 'p', text: line });
    }
    i++;
  }

  // Flush remaining table
  if (tableRows.length) {
    elements.push({ type: 'table', rows: tableRows });
  }

  // ============================================
  // CONVERSION-PUNKTE IM ARTIKEL
  // ============================================
  // 2 Einschübe, beide vor einem H2 (also nie mitten im Gedankengang):
  //   1. 'ctahint' – kurzer Satz nach dem ersten sinnvollen Content-Block
  //      (ab ~15% des Artikels). Rendert nur, wenn die Variante einen
  //      Hint definiert hat (z.B. nicht bei Quiz-Artikeln).
  //   2. 'democta' – die Box ab ~45% des Artikels.
  // Rückwärts einfügen, damit die Indizes stabil bleiben.
  const findH2From = (ratio) => elements.findIndex(
    (el, i) => el.type === 'h2' && i >= Math.floor(elements.length * ratio)
  );

  const midTarget = findH2From(0.45);
  if (midTarget > 0) {
    elements.splice(midTarget, 0, { type: 'democta' });
  } else {
    elements.push({ type: 'democta' });
  }

  // Nur bei längeren Artikeln (mind. 12 Blöcke) und mit genug Abstand zur Box
  if (elements.length >= 12) {
    const hintTarget = findH2From(0.15);
    if (hintTarget > 2 && hintTarget < (midTarget > 0 ? midTarget - 2 : elements.length)) {
      elements.splice(hintTarget, 0, { type: 'ctahint' });
    }
  }

  return elements.map((el, idx) => {
    switch (el.type) {
      case 'democta':
        return <WeddingWebsiteCTA key={idx} slug={slug} theme={theme} placement="mid" />;
      case 'ctahint':
        return <WeddingWebsiteCTA key={idx} slug={slug} theme={theme} placement="hint" />;
      case 'h2':
        return <ArticleH2 key={idx} $theme={theme}>{el.text}</ArticleH2>;
      case 'h3':
        return <ArticleH3 key={idx} $theme={theme}>{el.text}</ArticleH3>;
      case 'image':
        return <ArticleImage key={idx} src={el.src} alt={el.alt} $theme={theme} loading="lazy" />;
      case 'p':
        return <ArticleP key={idx} $theme={theme} dangerouslySetInnerHTML={{ __html: processInline(el.text) }} />;
      case 'list':
        return (
          <ArticleList key={idx} $theme={theme}>
            {el.items.map((item, j) => (
              <ArticleLi key={j} $theme={theme} dangerouslySetInnerHTML={{ __html: processInline(item) }} />
            ))}
          </ArticleList>
        );
      case 'table':
        return (
          <ArticleTableWrapper key={idx}>
            <ArticleTable $theme={theme}>
              <caption style={{ display: 'none' }}>{el.rows[0]?.join(' – ')}</caption>
              <thead>
                <tr>{el.rows[0]?.map((cell, j) => <ArticleTh key={j} $theme={theme}>{cell}</ArticleTh>)}</tr>
              </thead>
              <tbody>
                {el.rows.slice(1).map((row, ri) => (
                  <tr key={ri}>{row.map((cell, j) => <ArticleTd key={j} $theme={theme}>{cell}</ArticleTd>)}</tr>
                ))}
              </tbody>
            </ArticleTable>
          </ArticleTableWrapper>
        );
      default:
        return null;
    }
  });
};

// ============================================
// STYLED COMPONENTS
// ============================================
const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${p => getBackground(p.$theme)};
`;

const ArticleHero = styled.section`
  padding: clamp(8rem, 15vh, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vh, 3rem);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding-top: 6.5rem;
  }
`;

const BackLink = styled(Link)`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.85rem;
  color: ${p => getAccent(p.$theme)};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }

  ${p => p.$theme === 'neon' && css` text-shadow: 0 0 8px ${getAccent(p.$theme)}; `}
`;

const CategoryLabel = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => getAccent(p.$theme)};
  display: block;
  margin-bottom: 1.5rem;
`;

const ArticleTitle = styled.h1`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '300' : '700'};
  color: ${p => getTextColor(p.$theme)};
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: ${p => ['editorial', 'contemporary'].includes(p.$theme) ? '-0.02em' : '0'};

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
  ${p => p.$theme === 'neon' && css` text-shadow: 0 0 20px rgba(0,255,255,0.4); `}
  ${p => p.$theme === 'modern' && css` font-weight: 800; letter-spacing: -0.03em; `}
`;

const ArticleMeta = styled.div`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
  color: ${p => getSecondaryText(p.$theme)};
`;

const ArticleContent = styled.article`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 8rem);
`;

const ArticleH2 = styled.h2`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '400' : '700'};
  color: ${p => getTextColor(p.$theme)};
  margin: 2.5rem 0 1rem;
  line-height: 1.2;
  letter-spacing: ${p => ['editorial', 'contemporary'].includes(p.$theme) ? '-0.01em' : '0'};

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
  ${p => p.$theme === 'neon' && css` text-shadow: 0 0 10px rgba(0,255,255,0.3); `}
`;

const ArticleH3 = styled.h3`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: 1.2rem;
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '500' : '700'};
  color: ${p => getTextColor(p.$theme)};
  margin: 2rem 0 0.75rem;
  line-height: 1.3;
`;

const ArticleP = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 1rem;
  color: ${p => getSecondaryText(p.$theme)};
  line-height: 1.8;
  margin-bottom: 1.25rem;

  strong {
    color: ${p => getTextColor(p.$theme)};
    font-weight: 600;
  }
`;

const ArticleList = styled.ul`
  margin: 1rem 0 1.5rem 1.5rem;
  list-style: none;
`;

const ArticleLi = styled.li`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 1rem;
  color: ${p => getSecondaryText(p.$theme)};
  line-height: 1.7;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 6px;
    height: 6px;
    border-radius: ${p => p.$theme === 'contemporary' ? '0' : '50%'};
    background: ${p => getAccent(p.$theme)};

    ${p => p.$theme === 'neon' && css`
      box-shadow: 0 0 6px ${getAccent(p.$theme)};
    `}
  }

  strong { color: ${p => getTextColor(p.$theme)}; font-weight: 600; }
`;

const ArticleImage = styled.img`
  width: 100%;
  max-width: 700px;
  height: auto;
  border-radius: ${p => p.$theme === 'botanical' ? '12px' : p.$theme === 'contemporary' ? '0' : '4px'};
  margin: 1.5rem 0;
  display: block;

  ${p => p.$theme === 'contemporary' && css`
    border: 3px solid #0D0D0D;
    box-shadow: 6px 6px 0 #0D0D0D;
  `}

  ${p => p.$theme === 'neon' && css`
    border: 1px solid rgba(0,255,255,0.2);
  `}

  ${p => p.$theme === 'luxe' && css`
    border: 1px solid rgba(201,169,98,0.2);
  `}
`;

const ArticleTableWrapper = styled.div`
  overflow-x: auto;
  margin: 1.5rem 0;
`;

const ArticleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
`;

const ArticleTh = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: ${p => getTextColor(p.$theme)};
  border-bottom: 2px solid ${p => getAccent(p.$theme)};
`;

const ArticleTd = styled.td`
  padding: 0.75rem 1rem;
  color: ${p => getSecondaryText(p.$theme)};
  border-bottom: 1px solid ${p => getCardBorder(p.$theme)};
`;

// Related posts
const RelatedSection = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 6rem);
`;

const RelatedTitle = styled.h3`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: 1.3rem;
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '400' : '700'};
  color: ${p => getTextColor(p.$theme)};
  margin-bottom: 1.5rem;
  text-transform: ${p => ['editorial', 'contemporary', 'neon', 'video'].includes(p.$theme) ? 'uppercase' : 'none'};
`;

const RelatedLink = styled(Link)`
  display: block;
  padding: 1.25rem;
  margin-bottom: 1rem;
  text-decoration: none;
  background: ${p => getCardBg(p.$theme)};
  border: 1px solid ${p => getCardBorder(p.$theme)};
  border-radius: ${p => p.$theme === 'botanical' ? '12px' : '0'};
  transition: all 0.2s ease;

  &:hover { border-color: ${p => getAccent(p.$theme)}; }

  ${p => p.$theme === 'contemporary' && css`
    border-width: 3px;
    box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { box-shadow: 6px 6px 0 #0D0D0D; transform: translate(-1px, -1px); }
  `}
`;

const RelatedLinkTitle = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 1rem;
  font-weight: 600;
  color: ${p => getTextColor(p.$theme)};
`;

// ============================================
// COMPONENT
// ============================================
const BlogArticle = () => {
  const { slug } = useParams();
  const { currentTheme } = useTheme();
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Article view tracking
  useEffect(() => {
    if (post) {
      trackBlogArticleView(post.slug, post.title);
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll depth tracking (25%, 50%, 75%, 100%)
  const scrollMilestones = useRef(new Set());
  const handleScroll = useCallback(() => {
    if (!post) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);
    [25, 50, 75, 100].forEach(milestone => {
      if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
        scrollMilestones.current.add(milestone);
        trackBlogScrollDepth(post.slug, milestone);
      }
    });
  }, [post]);

  useEffect(() => {
    scrollMilestones.current = new Set();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, slug]);

  if (!post) {
    return (
      <PageWrapper $theme={currentTheme}>
        <SEOHead
          title="Artikel nicht gefunden | S&I."
          description="Der gesuchte Artikel wurde nicht gefunden."
          path={`/blog/${slug}`}
          noIndex={true}
        />
        <MarketingNav />
        <ArticleHero>
          <ArticleTitle $theme={currentTheme}>Artikel nicht gefunden</ArticleTitle>
          <BackLink to="/blog" $theme={currentTheme}>← Zurück zum Ratgeber</BackLink>
        </ArticleHero>
        <MarketingFooter />
      </PageWrapper>
    );
  }

  // Smart related posts: prioritize same category, then shared tags
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      let score = 0;
      if (p.category === post.category) score += 3;
      const sharedTags = p.tags?.filter(t => post.tags?.includes(t)) || [];
      score += sharedTags.length;
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score || new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <PageWrapper $theme={currentTheme}>
      <SEOHead
        title={`${post.seoTitle || post.title} | S&I.`}
        description={post.description}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        keywords={post.keywords}
        schema={post.schema ? {
          ...post.schema,
          '@context': 'https://schema.org',
          'url': `https://www.sarahiver.com/blog/${post.slug}`,
          'image': post.image,
          'dateModified': post.date,
        } : null}
      />
      {currentTheme === 'botanical' && <BotanicalLeaves />}
      <MarketingNav />

      <ArticleHero>
        <BackLink to="/blog" $theme={currentTheme}>← Alle Artikel</BackLink>
        <CategoryLabel $theme={currentTheme}>{post.category}</CategoryLabel>
        <ArticleTitle $theme={currentTheme}>{post.title}</ArticleTitle>
        <ArticleMeta $theme={currentTheme}>
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime} Lesezeit
        </ArticleMeta>
      </ArticleHero>

      <ArticleContent>
        {renderMarkdown(post.content, currentTheme, post.slug)}
      </ArticleContent>

      {/* Conversion-Block am Artikelende — Variante passend zum Artikel */}
      <WeddingWebsiteCTA slug={post.slug} theme={currentTheme} placement="end" />

      {relatedPosts.length > 0 && (
        <RelatedSection>
          <RelatedTitle $theme={currentTheme}>Weitere Artikel</RelatedTitle>
          {relatedPosts.map(rp => (
            <RelatedLink key={rp.slug} to={`/blog/${rp.slug}`} $theme={currentTheme}>
              <RelatedLinkTitle $theme={currentTheme}>{rp.title}</RelatedLinkTitle>
            </RelatedLink>
          ))}
        </RelatedSection>
      )}

      <MarketingFooter />
    </PageWrapper>
  );
};

export default BlogArticle;
