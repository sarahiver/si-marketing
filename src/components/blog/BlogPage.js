// src/components/blog/BlogPage.js
// Blog-Übersichtsseite mit Theme-Support für alle 6 Themes
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getAllPosts } from '../../content/blog/blogPosts';
import MarketingNav from '../marketing/MarketingNav';
import MarketingFooter from '../marketing/MarketingFooter';
import BotanicalLeaves from '../marketing/BotanicalLeaves';

// ============================================
// THEME HELPERS
// ============================================
const getBackground = (theme) => {
  const bgs = {
    editorial: '#FAFAFA', botanical: '#040604', contemporary: '#FAFAFA',
    luxe: '#0A0A0A', neon: '#0a0a0f', video: '#0A0A0A',
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
  };
  return colors[theme] || '#666666';
};

const getAccent = (theme) => {
  const accents = {
    editorial: '#C41E3A', botanical: 'rgba(45,90,60,0.8)', contemporary: '#FF6B6B',
    luxe: '#C9A962', neon: '#00ffff', video: '#6B8CAE',
  };
  return accents[theme] || '#C41E3A';
};

const getCardBg = (theme) => {
  const cards = {
    editorial: '#FFFFFF', botanical: 'rgba(255,255,255,0.08)',
    contemporary: '#FFFFFF', luxe: '#1A1A1D',
    neon: 'rgba(255,255,255,0.05)', video: '#252525',
  };
  return cards[theme] || '#FFFFFF';
};

const getCardBorder = (theme) => {
  const borders = {
    editorial: '#E5E5E5', botanical: 'rgba(255,255,255,0.15)',
    contemporary: '#0D0D0D', luxe: 'rgba(201,169,98,0.25)',
    neon: 'rgba(0,255,255,0.3)', video: 'rgba(107,140,174,0.3)',
  };
  return borders[theme] || '#E5E5E5';
};

const getHeadlineFont = (theme) => {
  const fonts = {
    editorial: "'Oswald', sans-serif", botanical: "'Cormorant Garamond', serif",
    contemporary: "'Space Grotesk', sans-serif", luxe: "'Cormorant', serif",
    neon: "'Space Grotesk', sans-serif", video: "'Manrope', sans-serif",
  };
  return fonts[theme] || "'Oswald', sans-serif";
};

const getBodyFont = (theme) => {
  const fonts = {
    editorial: "'Inter', sans-serif", botanical: "'Montserrat', sans-serif",
    contemporary: "'Space Grotesk', sans-serif", luxe: "'Outfit', sans-serif",
    neon: "'Space Grotesk', sans-serif", video: "'Inter', sans-serif",
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

const PostsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 8rem);
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
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

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

const PostThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const PostContent = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
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
// COMPONENT
// ============================================
const BlogPage = () => {
  const { currentTheme } = useTheme();
  const posts = getAllPosts();

  useEffect(() => {
    document.title = 'Ratgeber | S&I. — Tipps rund um eure Hochzeitswebsite';
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <PageWrapper $theme={currentTheme}>
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

      <PostsGrid>
        {posts.map(post => (
          <PostCard key={post.slug} to={`/blog/${post.slug}`} $theme={currentTheme}>
            {post.image && <PostThumbnail src={post.image} alt={post.imageAlt || post.title} loading="lazy" />}
            <PostContent>
              <PostCategory $theme={currentTheme}>{post.category}</PostCategory>
              <PostTitle $theme={currentTheme}>{post.title}</PostTitle>
              <PostExcerpt $theme={currentTheme}>{post.description}</PostExcerpt>
              <PostMeta $theme={currentTheme}>
                <span>{formatDate(post.date)} · {post.readTime}</span>
                <ReadMore $theme={currentTheme}>Weiterlesen →</ReadMore>
              </PostMeta>
            </PostContent>
          </PostCard>
        ))}
      </PostsGrid>

      <MarketingFooter />
    </PageWrapper>
  );
};

export default BlogPage;
