// src/components/blog/BlogPage.js
// Blog-Übersichtsseite mit Theme-Support, Tag-Filter und "Mehr anzeigen"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getAllPosts } from '../../content/blog/blogPosts';
import MarketingNav from '../marketing/MarketingNav';
import MarketingFooter from '../marketing/MarketingFooter';
import BotanicalLeaves from '../marketing/BotanicalLeaves';
import SEOHead from '../shared/SEOHead';

// ============================================
// THEME HELPERS
// ============================================
const getBackground = (theme) => {
  const bgs = {
    editorial: '#FAFAFA', botanical: '#040604', contemporary: '#FAFAFA',
    luxe: '#0A0A0A', neon: '#0a0a0f', video: '#0A0A0A', classic: '#FDFCFA',
  };
  return bgs[theme] || '#FAFAFA';
};

const getTextColor = (theme) => {
  const dark = ['botanical', 'luxe', 'neon', 'video'];
  return dark.includes(theme) ? '#FFFFFF' : '#0A0A0A';
};

const getSecondaryText = (theme) => {
  const colors = {
    editorial: '#666666', botanical: 'rgba(255,255,255,0.55)', contemporary: '#737373',
    luxe: 'rgba(248,246,243,0.5)', neon: 'rgba(255,255,255,0.6)', video: '#B0B0B0',
    classic: '#555555',
  };
  return colors[theme] || '#666666';
};

const getAccent = (theme) => {
  const accents = {
    editorial: '#C41E3A', botanical: 'rgba(45,90,60,0.8)', contemporary: '#FF6B6B',
    luxe: '#C9A962', neon: '#00ffff', video: '#6B8CAE', classic: '#999999',
  };
  return accents[theme] || '#C41E3A';
};

const getCardBg = (theme) => {
  const cards = {
    editorial: '#FFFFFF', botanical: 'rgba(255,255,255,0.08)',
    contemporary: '#FFFFFF', luxe: '#1A1A1D',
    neon: 'rgba(255,255,255,0.05)', video: '#252525', classic: '#FFFFFF',
  };
  return cards[theme] || '#FFFFFF';
};

const getCardBorder = (theme) => {
  const borders = {
    editorial: '#E5E5E5', botanical: 'rgba(255,255,255,0.15)',
    contemporary: '#0D0D0D', luxe: 'rgba(201,169,98,0.25)',
    neon: 'rgba(0,255,255,0.3)', video: 'rgba(107,140,174,0.3)',
    classic: 'rgba(0,0,0,0.06)',
  };
  return borders[theme] || '#E5E5E5';
};

const getHeadlineFont = (theme) => {
  const fonts = {
    editorial: "'Oswald', sans-serif", botanical: "'Cormorant Garamond', serif",
    contemporary: "'Space Grotesk', sans-serif", luxe: "'Cormorant', serif",
    neon: "'Space Grotesk', sans-serif", video: "'Manrope', sans-serif",
    classic: "'Cormorant Garamond', serif",
  };
  return fonts[theme] || "'Oswald', sans-serif";
};

const getBodyFont = (theme) => {
  const fonts = {
    editorial: "'Inter', sans-serif", botanical: "'Montserrat', sans-serif",
    contemporary: "'Space Grotesk', sans-serif", luxe: "'Outfit', sans-serif",
    neon: "'Space Grotesk', sans-serif", video: "'Inter', sans-serif",
    classic: "'Josefin Sans', sans-serif",
  };
  return fonts[theme] || "'Inter', sans-serif";
};

// ============================================
// STYLED COMPONENTS
// ============================================
const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${p => getBackground(p.$theme)};
  transition: background 0.3s ease;
`;

const HeroSection = styled.section`
  padding: clamp(8rem, 15vh, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const HeroLabel = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => getAccent(p.$theme)};
  display: block;
  margin-bottom: 1.5rem;

  ${p => p.$theme === 'neon' && css`
    text-shadow: ${p => `0 0 10px ${getAccent(p.$theme)}`};
  `}
`;

const HeroTitle = styled.h1`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '300' : '700'};
  color: ${p => getTextColor(p.$theme)};
  line-height: 1;
  margin-bottom: 1.5rem;
  letter-spacing: ${p => ['editorial', 'contemporary'].includes(p.$theme) ? '-0.02em' : '0'};
  text-transform: ${p => ['editorial', 'contemporary', 'neon', 'video'].includes(p.$theme) ? 'uppercase' : 'none'};

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
  ${p => p.$theme === 'neon' && css` text-shadow: 0 0 20px rgba(0,255,255,0.5); `}
`;

const HeroDescription = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 1.1rem;
  color: ${p => getSecondaryText(p.$theme)};
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
`;

// ============================================
// TAG FILTER
// ============================================
const FilterSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem) 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const TagButton = styled.button`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 0.45rem 1rem;
  border-radius: ${p => p.$theme === 'botanical' ? '20px' : p.$theme === 'contemporary' ? '0' : '2px'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${p => {
    const accent = getAccent(p.$theme);
    const cardBg = getCardBg(p.$theme);
    const textColor = getTextColor(p.$theme);
    const border = getCardBorder(p.$theme);

    if (p.$active) {
      // Active state
      if (p.$theme === 'contemporary') {
        return css`
          background: #0D0D0D;
          color: #FFFFFF;
          border: 2px solid #0D0D0D;
          box-shadow: 3px 3px 0 ${accent};
        `;
      }
      if (p.$theme === 'neon') {
        return css`
          background: rgba(0,255,255,0.15);
          color: #00ffff;
          border: 1px solid #00ffff;
          box-shadow: 0 0 10px rgba(0,255,255,0.3);
        `;
      }
      return css`
        background: ${accent};
        color: ${['botanical', 'luxe', 'video', 'editorial'].includes(p.$theme) ? '#FFFFFF' : '#0A0A0A'};
        border: 1px solid ${accent};
      `;
    } else {
      // Inactive state
      if (p.$theme === 'contemporary') {
        return css`
          background: transparent;
          color: ${textColor};
          border: 2px solid ${border};
          &:hover {
            border-color: #0D0D0D;
            box-shadow: 2px 2px 0 #0D0D0D;
          }
        `;
      }
      return css`
        background: ${cardBg};
        color: ${getSecondaryText(p.$theme)};
        border: 1px solid ${border};
        &:hover {
          border-color: ${accent};
          color: ${textColor};
        }
      `;
    }
  }}
`;

// ============================================
// POSTS GRID
// ============================================
const PostsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem) 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PostCard = styled(Link)`
  text-decoration: none;
  background: ${p => getCardBg(p.$theme)};
  border: ${p => p.$theme === 'contemporary' ? '3px solid #0D0D0D' : `1px solid ${getCardBorder(p.$theme)}`};
  border-radius: ${p => p.$theme === 'botanical' ? '16px' : '0'};
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${p => p.$theme === 'contemporary' && css`
    box-shadow: 6px 6px 0 #0D0D0D;
    &:hover { box-shadow: 8px 8px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}

  ${p => p.$theme === 'botanical' && css`
    backdrop-filter: blur(40px);
    &:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); }
  `}

  ${p => p.$theme === 'neon' && css`
    &:hover { border-color: #00ffff; box-shadow: 0 0 15px rgba(0,255,255,0.2); }
  `}

  ${p => p.$theme === 'luxe' && css`
    &:hover { border-color: #C9A962; }
  `}

  ${p => p.$theme === 'editorial' && css`
    &:hover { border-color: #C41E3A; }
  `}

  ${p => p.$theme === 'video' && css`
    &:hover { border-color: #6B8CAE; }
  `}
`;

const PostCategory = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => getAccent(p.$theme)};

  ${p => p.$theme === 'neon' && css`
    text-shadow: 0 0 8px ${getAccent(p.$theme)};
  `}
`;

const PostTitle = styled.h2`
  font-family: ${p => getHeadlineFont(p.$theme)};
  font-size: 1.4rem;
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '400' : '700'};
  color: ${p => getTextColor(p.$theme)};
  line-height: 1.2;
  letter-spacing: ${p => ['editorial', 'contemporary'].includes(p.$theme) ? '-0.01em' : '0'};

  ${p => p.$theme === 'luxe' && css` font-style: italic; `}
`;

const PostExcerpt = styled.p`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
  color: ${p => getSecondaryText(p.$theme)};
  line-height: 1.6;
  flex: 1;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const PostTag = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.55rem;
  border-radius: ${p => p.$theme === 'botanical' ? '10px' : p.$theme === 'contemporary' ? '0' : '2px'};
  background: ${p => {
    if (p.$theme === 'neon') return 'rgba(0,255,255,0.08)';
    if (p.$theme === 'contemporary') return 'rgba(0,0,0,0.05)';
    if (['botanical', 'luxe', 'video'].includes(p.$theme)) return 'rgba(255,255,255,0.06)';
    return 'rgba(0,0,0,0.04)';
  }};
  color: ${p => getSecondaryText(p.$theme)};
  border: 1px solid ${p => {
    if (p.$theme === 'neon') return 'rgba(0,255,255,0.15)';
    return getCardBorder(p.$theme);
  }};
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.8rem;
  color: ${p => getSecondaryText(p.$theme)};
  opacity: 0.7;
  padding-top: 1rem;
  border-top: 1px solid ${p => getCardBorder(p.$theme)};
`;

const ReadMore = styled.span`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${p => getAccent(p.$theme)};
  letter-spacing: 0.05em;
`;

// ============================================
// SHOW MORE BUTTON
// ============================================
const ShowMoreWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 8rem);
  text-align: center;
`;

const ShowMoreButton = styled.button`
  font-family: ${p => getBodyFont(p.$theme)};
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.85rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  ${p => p.$theme === 'editorial' && css`
    background: transparent;
    color: #C41E3A;
    border: 1px solid #C41E3A;
    &:hover { background: #C41E3A; color: #fff; }
  `}
  ${p => p.$theme === 'botanical' && css`
    background: rgba(45,90,60,0.15);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 28px;
    backdrop-filter: blur(10px);
    &:hover { background: rgba(45,90,60,0.8); }
  `}
  ${p => p.$theme === 'contemporary' && css`
    background: #FF6B6B;
    color: #0D0D0D;
    border: 3px solid #0D0D0D;
    box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { box-shadow: 6px 6px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}
  ${p => p.$theme === 'luxe' && css`
    background: transparent;
    color: #C9A962;
    border: 1px solid #C9A962;
    &:hover { background: #C9A962; color: #0A0A0A; }
  `}
  ${p => p.$theme === 'neon' && css`
    background: transparent;
    color: #00ffff;
    border: 1px solid #00ffff;
    box-shadow: 0 0 10px rgba(0,255,255,0.3);
    &:hover { background: rgba(0,255,255,0.1); box-shadow: 0 0 20px rgba(0,255,255,0.5); }
  `}
  ${p => p.$theme === 'video' && css`
    background: transparent;
    color: #6B8CAE;
    border: 1px solid #6B8CAE;
    &:hover { background: #6B8CAE; color: #0A0A0A; }
  `}
`;

// ============================================
// COMPONENT
// ============================================

// Initial visible count: 2 rows × 3 columns on desktop = 6
const INITIAL_VISIBLE = 6;

const BlogPage = () => {
  const { currentTheme } = useTheme();
  const allPosts = getAllPosts();
  const [activeTag, setActiveTag] = useState('Alle');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset showAll when tag changes
  useEffect(() => {
    setShowAll(false);
  }, [activeTag]);

  // Collect unique tags from all posts
  const allTags = ['Alle', ...Array.from(new Set(allPosts.flatMap(p => p.tags || [])))];

  // Filter posts by tag
  const filteredPosts = activeTag === 'Alle'
    ? allPosts
    : allPosts.filter(p => (p.tags || []).includes(activeTag));

  // Apply "show more" limit
  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredPosts.length > INITIAL_VISIBLE && !showAll;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <PageWrapper $theme={currentTheme}>
      <SEOHead
        title="Ratgeber | S&I. — Tipps rund um eure Hochzeitswebsite"
        description="Tipps, Vergleiche und Inspiration rund um Hochzeitswebsites, digitale Hochzeitsplanung und alles, was eure Feier unvergesslich macht."
        path="/blog"
        keywords={['hochzeitswebsite ratgeber', 'hochzeitsplanung tipps', 'hochzeitswebsite erstellen', 'digitale hochzeit']}
      />
      {currentTheme === 'botanical' && <BotanicalLeaves />}
      <MarketingNav />

      <HeroSection>
        <HeroLabel $theme={currentTheme}>Ratgeber</HeroLabel>
        <HeroTitle $theme={currentTheme}>
          {currentTheme === 'neon' ? '// Wissen für eure Hochzeit' : 'Wissen für eure Hochzeit'}
        </HeroTitle>
        <HeroDescription $theme={currentTheme}>
          Tipps, Vergleiche und Inspiration rund um Hochzeitswebsites, digitale Planung und alles, was eure Feier unvergesslich macht.
        </HeroDescription>
      </HeroSection>

      {/* Tag Filter */}
      <FilterSection>
        {allTags.map(tag => (
          <TagButton
            key={tag}
            $theme={currentTheme}
            $active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </FilterSection>

      <PostsGrid>
        {visiblePosts.map(post => (
          <PostCard key={post.slug} to={`/blog/${post.slug}`} $theme={currentTheme}>
            <PostCategory $theme={currentTheme}>{post.category}</PostCategory>
            <PostTitle $theme={currentTheme}>{post.title}</PostTitle>
            <PostExcerpt $theme={currentTheme}>{post.description}</PostExcerpt>
            {post.tags && post.tags.length > 0 && (
              <PostTags>
                {post.tags.map(tag => (
                  <PostTag key={tag} $theme={currentTheme}>{tag}</PostTag>
                ))}
              </PostTags>
            )}
            <PostMeta $theme={currentTheme}>
              <span>{formatDate(post.date)} · {post.readTime}</span>
              <ReadMore $theme={currentTheme}>Weiterlesen →</ReadMore>
            </PostMeta>
          </PostCard>
        ))}
      </PostsGrid>

      {/* Show More */}
      {hasMore && (
        <ShowMoreWrapper>
          <ShowMoreButton
            $theme={currentTheme}
            onClick={() => setShowAll(true)}
          >
            Mehr Artikel anzeigen ({filteredPosts.length - INITIAL_VISIBLE} weitere)
          </ShowMoreButton>
        </ShowMoreWrapper>
      )}

      {/* Bottom spacing when no "show more" */}
      {!hasMore && <div style={{ paddingBottom: 'clamp(4rem, 8vh, 8rem)' }} />}

      <MarketingFooter />
    </PageWrapper>
  );
};

export default BlogPage;
