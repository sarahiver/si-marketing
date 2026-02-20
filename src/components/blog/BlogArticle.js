// src/components/blog/BlogArticle.js
// Einzelner Blog-Artikel mit Theme-Support + einfacher Markdown-Rendering
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getPostBySlug, getAllPosts } from '../../content/blog/blogPosts';
import MarketingNav from '../marketing/MarketingNav';
import MarketingFooter from '../marketing/MarketingFooter';
import BotanicalLeaves from '../marketing/BotanicalLeaves';
import SEOHead from '../shared/SEOHead';

// ============================================
// THEME HELPERS (same as BlogPage)
// ============================================
const getBackground = (t) => ({ editorial: '#FAFAFA', botanical: '#040604', contemporary: '#FAFAFA', luxe: '#0A0A0A', neon: '#0a0a0f', video: '#0A0A0A', classic: '#FDFCFA' }[t] || '#FAFAFA');
const getTextColor = (t) => ['botanical', 'luxe', 'neon', 'video'].includes(t) ? '#FFFFFF' : '#0A0A0A';
const getSecondaryText = (t) => ({ editorial: '#666666', botanical: 'rgba(255,255,255,0.55)', contemporary: '#737373', luxe: 'rgba(248,246,243,0.5)', neon: 'rgba(255,255,255,0.6)', video: '#B0B0B0', classic: '#555555' }[t] || '#666666');
const getAccent = (t) => ({ editorial: '#C41E3A', botanical: 'rgba(45,90,60,0.8)', contemporary: '#FF6B6B', luxe: '#C9A962', neon: '#00ffff', video: '#6B8CAE', classic: '#999999' }[t] || '#C41E3A');
const getCardBg = (t) => ({ editorial: '#FFFFFF', botanical: 'rgba(255,255,255,0.08)', contemporary: '#FFFFFF', luxe: '#1A1A1D', neon: 'rgba(255,255,255,0.05)', video: '#252525', classic: '#FFFFFF' }[t] || '#FFFFFF');
const getCardBorder = (t) => ({ editorial: '#E5E5E5', botanical: 'rgba(255,255,255,0.15)', contemporary: '#0D0D0D', luxe: 'rgba(201,169,98,0.25)', neon: 'rgba(0,255,255,0.3)', video: 'rgba(107,140,174,0.3)', classic: 'rgba(0,0,0,0.06)' }[t] || '#E5E5E5');
const getHeadlineFont = (t) => ({ editorial: "'Oswald', sans-serif", botanical: "'Cormorant Garamond', serif", contemporary: "'Space Grotesk', sans-serif", luxe: "'Cormorant', serif", neon: "'Space Grotesk', sans-serif", video: "'Manrope', sans-serif", classic: "'Cormorant Garamond', serif" }[t] || "'Oswald', sans-serif");
const getBodyFont = (t) => ({ editorial: "'Inter', sans-serif", botanical: "'Montserrat', sans-serif", contemporary: "'Space Grotesk', sans-serif", luxe: "'Outfit', sans-serif", neon: "'Space Grotesk', sans-serif", video: "'Inter', sans-serif", classic: "'Josefin Sans', sans-serif" }[t] || "'Inter', sans-serif");

// ============================================
// SIMPLE MARKDOWN RENDERER
// ============================================
const renderMarkdown = (content, theme) => {
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

  return elements.map((el, idx) => {
    switch (el.type) {
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

// CTA Section
const CTASection = styled.div`
  max-width: 700px;
  margin: 0 auto 4rem;
  padding: 2.5rem;
  text-align: center;
  background: ${p => getCardBg(p.$theme)};
  border: ${p => p.$theme === 'contemporary' ? '3px solid #0D0D0D' : `1px solid ${getCardBorder(p.$theme)}`};
  border-radius: ${p => p.$theme === 'botanical' ? '16px' : '0'};

  ${p => p.$theme === 'contemporary' && css` box-shadow: 6px 6px 0 #0D0D0D; `}
  ${p => p.$theme === 'botanical' && css` backdrop-filter: blur(40px); `}
`;

const CTATitle = styled.h3`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: 1.5rem;
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '400' : '700'};
  color: ${p => getTextColor(p.$theme)};
  margin-bottom: 1rem;

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
`;

const CTAText = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.95rem;
  color: ${p => getSecondaryText(p.$theme)};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 0.85rem 2.5rem;
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  cursor: pointer;

  ${p => p.$theme === 'editorial' && css`
    background: #C41E3A; color: #fff; border: none;
    &:hover { background: #A01830; }
  `}
  ${p => p.$theme === 'botanical' && css`
    background: rgba(45,90,60,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 28px; backdrop-filter: blur(10px);
    &:hover { background: rgba(45,90,60,1); }
  `}
  ${p => p.$theme === 'contemporary' && css`
    background: #FF6B6B; color: #0D0D0D; border: 3px solid #0D0D0D; box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { box-shadow: 6px 6px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}
  ${p => p.$theme === 'luxe' && css`
    background: transparent; color: #C9A962; border: 1px solid #C9A962;
    &:hover { background: #C9A962; color: #0A0A0A; }
  `}
  ${p => p.$theme === 'neon' && css`
    background: transparent; color: #00ffff; border: 1px solid #00ffff; box-shadow: 0 0 10px rgba(0,255,255,0.3);
    &:hover { background: rgba(0,255,255,0.1); box-shadow: 0 0 20px rgba(0,255,255,0.5); }
  `}
  ${p => p.$theme === 'video' && css`
    background: transparent; color: #6B8CAE; border: 1px solid #6B8CAE;
    &:hover { background: #6B8CAE; color: #0A0A0A; }
  `}
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
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <PageWrapper $theme={currentTheme}>
        <SEOHead
          title="Artikel nicht gefunden | S&I. Ratgeber"
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
        title={`${post.title} | S&I. Ratgeber`}
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
        {renderMarkdown(post.content, currentTheme)}
      </ArticleContent>

      <CTASection $theme={currentTheme}>
        <CTATitle $theme={currentTheme}>Bereit für eure Hochzeitswebsite?</CTATitle>
        <CTAText $theme={currentTheme}>
          Premium-Design, eigene Domain, RSVP und Foto-Upload – alles inklusive ab 1.290€.
        </CTAText>
        <CTAButton href="/#contact" $theme={currentTheme}>
          Jetzt anfragen
        </CTAButton>
      </CTASection>

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
