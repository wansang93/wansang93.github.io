'use client';

import { useState, useEffect, useRef } from 'react';
import { PHOTOS } from '@/lib/photos';
import { MISSIONS, useMissions, allMissionsCompleted } from '@/lib/missions';

type Lang = 'ko' | 'en';

function calcDuration(startStr: string, endStr: string | null, lang: Lang, inclusive = false): string {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (!inclusive && end.getDate() < start.getDate()) months--;
  if (months < 0) { years--; months += 12; }
  if (inclusive) { months++; if (months >= 12) { years++; months -= 12; } }

  const ko = lang === 'ko';
  if (years > 0 && months > 0) return ko ? `${years}년 ${months}개월` : `${years}y ${months}m`;
  if (years > 0) return ko ? `${years}년` : `${years}y`;
  if (months > 0) return ko ? `${months}개월` : `${months}m`;
  return ko ? '1개월 미만' : '< 1m';
}

function sumDurations(entries: Array<[string, string | null, boolean?]>, lang: Lang, prefix: string): string {
  let totalMonths = 0;
  for (const [s, e, inclusive = false] of entries) {
    const start = new Date(s);
    const end = e ? new Date(e) : new Date();
    let y = end.getFullYear() - start.getFullYear();
    let m = end.getMonth() - start.getMonth();
    if (!inclusive && end.getDate() < start.getDate()) m--;
    if (m < 0) { y--; m += 12; }
    if (inclusive) { m++; if (m >= 12) { y++; m -= 12; } }
    totalMonths += y * 12 + m;
  }
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const ko = lang === 'ko';
  if (years > 0 && months > 0) return ko ? `${prefix} ${years}년 ${months}개월` : `${prefix} ${years}y ${months}m`;
  if (years > 0) return ko ? `${prefix} ${years}년` : `${prefix} ${years}y`;
  return ko ? `${prefix} ${months}개월` : `${prefix} ${months}m`;
}

function totalCareerDuration(lang: Lang): string {
  return sumDurations([
    ['2022-07-15', null],
    ['2021-08-26', '2021-12-07', true],
  ], lang, lang === 'ko' ? '총' : 'Total');
}

function totalEduDuration(lang: Lang): string {
  return sumDurations([
    ['2022-01-05', '2022-07-14', true],
    ['2020-12-28', '2021-06-04', true],
    ['2019-04-22', '2019-11-27', true],
  ], lang, lang === 'ko' ? '총' : 'Total');
}

interface Props {
  lang: Lang;
}

const TIMELINE_START = 2009;

const CC = {
  school:   '#3b82f6',  // blue
  training: '#22c55e',  // green
  military: '#15803d',  // dark green
  abroad:   '#d97706',  // amber/gold
  career:   '#ef4444',  // red
} as const;

function CareerTimeline({ lang, onScrolled }: { lang: Lang; onScrolled?: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const pointerTypeRef = useRef<string>('mouse');
  const barClickedRef = useRef(false);
  const t = lang === 'ko';
  const endYear = new Date().getFullYear() + 1;
  const totalMonths = (endYear - TIMELINE_START) * 12;

  function pct(dateStr: string | null): number {
    const d = dateStr ? new Date(dateStr) : new Date();
    const m = (d.getFullYear() - TIMELINE_START) * 12 + d.getMonth();
    return Math.min(100, Math.max(0, (m / totalMonths) * 100));
  }

  function estLabelW(label: string): number {
    let px = 0;
    for (const ch of label) {
      const code = ch.charCodeAt(0);
      px += (code >= 0xAC00 && code <= 0xD7A3) ? 10 : 6.5;
    }
    return (px / 700) * 100;
  }

  function assignRows(items: { label: string; labelLeft: number; labelRight: number }[]): { rowOf: Map<string, number>; numRows: number } {
    const sorted = [...items].sort((a, b) => a.labelLeft - b.labelLeft);
    const rowEnds: number[] = [];
    const rowOf = new Map<string, number>();
    for (const item of sorted) {
      let placed = false;
      for (let r = 0; r < rowEnds.length; r++) {
        if (rowEnds[r] <= item.labelLeft - 1) {
          rowOf.set(item.label, r); rowEnds[r] = item.labelRight; placed = true; break;
        }
      }
      if (!placed) { rowOf.set(item.label, rowEnds.length); rowEnds.push(item.labelRight); }
    }
    return { rowOf, numRows: Math.max(1, rowEnds.length) };
  }

  const NARROW = 5;

  const TYPE_LABELS: Record<string, string> = {
    school:   t ? '학력'      : 'Education',
    training: t ? '교육'      : 'Training',
    military: t ? '병역'      : 'Military Service',
    abroad:   t ? '해외 경험' : 'International',
    career:   t ? '경력'      : 'Work Experience',
  };

  const SECTION_IDS: Record<string, string> = {
    school: 'resume-school', training: 'resume-training',
    military: 'resume-military', abroad: 'resume-abroad', career: 'resume-career',
  };

  function scrollToSection(barType: string) {
    const el = document.getElementById(SECTION_IDS[barType]);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      el.classList.add('section-arrive');
      setTimeout(() => el.classList.remove('section-arrive'), 1500);
    }
    onScrolled?.();
  }

  function handleBarClick(label: string, barType: string) {
    if (pointerTypeRef.current === 'touch') {
      if (hovered === label) { setHovered(null); scrollToSection(barType); }
      else { setHovered(label); }
    } else {
      scrollToSection(barType);
    }
  }

  const rawBars = [
    { label: t ? '안곡고등학교'       : 'Angok H.S.',        start: '2009-03-01', end: '2012-02-01', color: '#93c5fd',   upper: true,  type: 'school'   as const, ds: '2009-03-02', de: '2012-02-09', di: true  },
    { label: t ? '홍익대학교'         : 'Hongik Univ.',       start: '2012-03-01', end: '2019-02-01', color: CC.school,   upper: true,  type: 'school'   as const, ds: '2012-03-02', de: '2019-02-22', di: true  },
    { label: t ? '빅데이터AI'        : 'BigData AI',          start: '2019-04-01', end: '2019-12-01', color: CC.training, upper: true,  type: 'training' as const, ds: '2019-04-22', de: '2019-11-27', di: true  },
    { label: t ? '클라우드MSA'        : 'Cloud MSA',          start: '2020-12-01', end: '2021-07-01', color: CC.training, upper: true,  type: 'training' as const, ds: '2020-12-28', de: '2021-06-04', di: true  },
    { label: 'SSAFY',                                          start: '2022-01-01', end: '2022-08-01', color: CC.training, upper: true,  type: 'training' as const, ds: '2022-01-05', de: '2022-07-14', di: true  },
    { label: t ? '군대'               : 'Military',           start: '2014-04-01', end: '2016-01-01', color: CC.military, upper: false, type: 'military' as const, ds: '2014-04-01', de: '2016-01-01', di: false },
    { label: t ? '호주 워킹홀리데이' : 'AU Working Holiday', start: '2017-03-01', end: '2018-02-20', color: CC.abroad,   upper: false, type: 'abroad'   as const, ds: '2017-03-01', de: '2018-02-01', di: false },
    { label: t ? '호주여행'           : 'AU Trip',            start: '2019-01-01', end: '2019-03-27', color: CC.abroad,   upper: false, type: 'abroad'   as const, ds: '2019-01-27', de: '2019-03-26', di: true  },
    { label: 'Maven',                                          start: '2021-08-01', end: '2021-12-01', color: CC.career,   upper: false, type: 'career'   as const, ds: '2021-08-26', de: '2021-12-07', di: true  },
    { label: 'NDS',                                            start: '2022-07-01', end: null,          color: CC.career,   upper: false, type: 'career'   as const, ds: '2022-07-15', de: null,         di: false },
  ];

  const withPos = rawBars
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .map(bar => {
      const left = pct(bar.start);
      const width = Math.max(0.5, pct(bar.end) - left);
      const isNarrow = width < NARROW;
      const lw = estLabelW(bar.label);
      const center = isNarrow ? Math.min(96, left + width / 2) : -1;
      const labelLeft = isNarrow ? Math.max(0, center - lw / 2) : left;
      return { ...bar, left, width, isNarrow, labelLeft, labelRight: labelLeft + lw };
    });

  const upperBars = withPos.filter(b => b.upper);
  const lowerBars = withPos.filter(b => !b.upper);
  const { rowOf: upperRowOf, numRows: numUpperRows } = assignRows(upperBars);
  const { rowOf: lowerRowOf, numRows: numLowerRows } = assignRows(lowerBars);

  const BAR_H = 11;
  const LABEL_ROW_H = 15;
  const CONN_H = 5;
  const GAP_H = 4;

  const upperBarTop   = numUpperRows * LABEL_ROW_H + CONN_H;
  const lowerBarTop   = upperBarTop + BAR_H + GAP_H;
  const lowerConnTop  = lowerBarTop + BAR_H;
  const lowerLabelTop = lowerConnTop + CONN_H;
  const totalH        = lowerLabelTop + numLowerRows * LABEL_ROW_H;

  const years = Array.from({ length: endYear - TIMELINE_START + 1 }, (_, i) => TIMELINE_START + i);

  const connX = (bar: { isNarrow: boolean; left: number; width: number }) =>
    bar.isNarrow ? `${Math.min(96, bar.left + bar.width / 2)}%` : `${bar.left + 0.4}%`;
  const labelX = (bar: { isNarrow: boolean; left: number; width: number }) =>
    bar.isNarrow ? `${Math.min(96, bar.left + bar.width / 2)}%` : `${bar.left}%`;

  function fmtDate(dateStr: string | null): string {
    if (!dateStr) return t ? '현재' : 'Now';
    const d = new Date(dateStr);
    return `'${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  // Hover helpers
  const isHighlighting = hovered !== null;
  const hoveredData = hovered ? (withPos.find(b => b.label === hovered) ?? null) : null;
  const infoColor = hoveredData?.color ?? '#888';
  const infoDuration = hoveredData ? calcDuration(hoveredData.ds ?? hoveredData.start, hoveredData.de ?? hoveredData.end, lang, hoveredData.di ?? false) : '';
  const infoText = hoveredData
    ? `${TYPE_LABELS[hoveredData.type]}  ·  ${hoveredData.label}  ·  ${fmtDate(hoveredData.start)} ~ ${fmtDate(hoveredData.end)}  (${infoDuration})`
    : ' ';
  function barDimStyle(label: string, color: string) {
    const active = hovered === label;
    const faded = isHighlighting && !active;
    return {
      opacity: active ? 1 : faded ? 0.15 : 0.88,
      boxShadow: active ? `0 0 0 1.5px ${color}cc, 0 0 10px ${color}60` : 'none',
      transform: active ? 'scaleY(1.35)' : 'scaleY(1)',
      transformOrigin: 'center',
      transition: 'opacity 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease',
      cursor: 'pointer' as const,
    };
  }

  function labelTransform(label: string, isNarrow: boolean) {
    const active = hovered === label;
    const base = isNarrow ? 'translateX(-50%)' : '';
    const scale = active ? ' scale(1.25)' : '';
    return (base + scale).trim() || 'none';
  }

  function labelDimStyle(label: string, color: string, isNarrow: boolean) {
    const active = hovered === label;
    const faded = isHighlighting && !active;
    return {
      fontSize: 10,
      fontWeight: active ? 700 : 500,
      lineHeight: 1,
      color,
      opacity: active ? 1 : faded ? 0.18 : 1,
      transformOrigin: isNarrow ? 'center bottom' : 'left bottom',
      transition: 'opacity 0.25s ease, transform 0.2s ease, font-weight 0.1s ease',
      cursor: 'pointer' as const,
      whiteSpace: 'nowrap' as const,
    };
  }

  function connDimOpacity(label: string) {
    if (!isHighlighting) return 0.35;
    return hovered === label ? 0.6 : 0.07;
  }

  useEffect(() => {
    function onDocClick() {
      if (barClickedRef.current) { barClickedRef.current = false; return; }
      if (pointerTypeRef.current === 'touch') setHovered(null);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="mb-10">
      <div className="relative w-full select-none" style={{ height: totalH }}>

        {/* ── Upper labels ── */}
        {upperBars.map(bar => {
          const r = upperRowOf.get(bar.label) ?? 0;
          return (
            <div
              key={`lu-${bar.label}`}
              onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(bar.label); }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null); }}
              onClick={(e) => { e.stopPropagation(); barClickedRef.current = true; handleBarClick(bar.label, bar.type); }}
              style={{
                position: 'absolute',
                top: (numUpperRows - 1 - r) * LABEL_ROW_H,
                left: labelX(bar),
                transform: labelTransform(bar.label, bar.isNarrow),
                ...labelDimStyle(bar.label, bar.color, bar.isNarrow),
              }}
            >
              {bar.label}
            </div>
          );
        })}

        {/* ── Upper connectors ── */}
        {upperBars.map(bar => {
          const r = upperRowOf.get(bar.label) ?? 0;
          return (
            <div key={`cu-${bar.label}`} style={{
              position: 'absolute',
              width: 1,
              backgroundColor: bar.color,
              opacity: connDimOpacity(bar.label),
              top: (numUpperRows - r) * LABEL_ROW_H,
              left: connX(bar),
              height: r * LABEL_ROW_H + CONN_H,
              transition: 'opacity 0.25s ease',
            }} />
          );
        })}

        {/* ── Upper bars ── */}
        {upperBars.map(bar => (
          <div
            key={`bu-${bar.label}`}
            onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; }}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(bar.label); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null); }}
            onClick={(e) => { e.stopPropagation(); barClickedRef.current = true; handleBarClick(bar.label, bar.type); }}
            style={{
              position: 'absolute',
              top: upperBarTop,
              left: `${bar.left}%`, width: `${bar.width}%`,
              height: BAR_H, minWidth: 3,
              backgroundColor: bar.color, borderRadius: 3,
              ...barDimStyle(bar.label, bar.color),
            }}
          />
        ))}

        {/* ── Lower bars ── */}
        {lowerBars.map(bar => (
          <div
            key={`bl-${bar.label}`}
            onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; }}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(bar.label); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null); }}
            onClick={(e) => { e.stopPropagation(); barClickedRef.current = true; handleBarClick(bar.label, bar.type); }}
            style={{
              position: 'absolute',
              top: lowerBarTop,
              left: `${bar.left}%`, width: `${bar.width}%`,
              height: BAR_H, minWidth: 3,
              backgroundColor: bar.color, borderRadius: 3,
              ...barDimStyle(bar.label, bar.color),
            }}
          />
        ))}

        {/* ── Lower connectors ── */}
        {lowerBars.map(bar => {
          const r = lowerRowOf.get(bar.label) ?? 0;
          return (
            <div key={`cl-${bar.label}`} style={{
              position: 'absolute',
              width: 1,
              backgroundColor: bar.color,
              opacity: connDimOpacity(bar.label),
              top: lowerConnTop,
              left: connX(bar),
              height: CONN_H + r * LABEL_ROW_H,
              transition: 'opacity 0.25s ease',
            }} />
          );
        })}

        {/* ── Lower labels ── */}
        {lowerBars.map(bar => {
          const r = lowerRowOf.get(bar.label) ?? 0;
          return (
            <div
              key={`ll-${bar.label}`}
              onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(bar.label); }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null); }}
              onClick={(e) => { e.stopPropagation(); barClickedRef.current = true; handleBarClick(bar.label, bar.type); }}
              style={{
                position: 'absolute',
                top: lowerLabelTop + r * LABEL_ROW_H,
                left: labelX(bar),
                transform: labelTransform(bar.label, bar.isNarrow),
                ...labelDimStyle(bar.label, bar.color, bar.isNarrow),
              }}
            >
              {bar.label}
            </div>
          );
        })}

      </div>

      {/* year axis — every 2 years */}
      <div className="relative h-4 mt-1 w-full">
        {years.filter((_, i) => i % 2 === 0).map(year => (
          <span key={year} className="absolute text-[10px] text-muted"
            style={{
              left: `${((year - TIMELINE_START) / (endYear - TIMELINE_START)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {`'${String(year).slice(2)}`}
          </span>
        ))}
      </div>

      {/* Category info pill — fades in on hover */}
      <div className="flex justify-center mt-2" style={{ height: 22, pointerEvents: 'none' }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: infoColor,
          background: hoveredData ? `${infoColor}18` : 'transparent',
          border: `1px solid ${hoveredData ? infoColor + '50' : 'transparent'}`,
          padding: '2px 12px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          opacity: hoveredData ? 1 : 0,
          transform: hoveredData ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          display: 'inline-block',
        }}>
          {infoText}
        </span>
      </div>
    </div>
  );
}

const CERTS = [
  { name: 'AWS DevOps Engineer – Professional', aka: 'AWS DOP', issuer: 'Amazon Web Services', issued: '2025.06.30', expires: '2028.06.30' },
  { name: 'Google Cloud SecOps Technical Credential', aka: 'GC-SecOps', issuer: 'Google Cloud', issued: '2025.04.01', expires: '2027.04.01' },
  { name: 'Google Workspace Deployment Services TC', aka: 'GWDS', issuer: 'Google Cloud', issued: '2025.04.01', expires: '2027.04.01' },
  { name: 'SnowPro Advanced: Administrator', aka: 'Snowflake ADA', issuer: 'Snowflake Inc.', issued: '2025.05.09', expires: '2027.05.09' },
  { name: 'SnowPro Core Certification', aka: 'Snowflake Core', issuer: 'Snowflake Inc.', issued: '2024.12.19', expires: '2026.12.19' },
  { name: 'AWS Solutions Architect – Professional', aka: 'AWS SAP', issuer: 'Amazon Web Services', issued: '2023.12.22', expires: '2026.12.22' },
  { name: '정보처리기사 / Engineer Information Processing', aka: '정보처리기사', issuer: '한국산업인력공단', issued: '2022.11.25', expires: '무제한' },
  { name: 'SQL 개발자 / SQL Developer', aka: 'SQLD', issuer: '한국데이터산업진흥원', issued: '2021.12.17', expires: '무제한' },
];

function ResumeTab({ lang }: { lang: Lang }) {
  const t = lang === 'ko';
  const [showBack, setShowBack] = useState(false);
  return (
    <div id="resume-top" className="space-y-10">
      <CareerTimeline lang={lang} onScrolled={() => setShowBack(true)} />
      {/* 경력 */}
      <section id="resume-career">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <h2 className="font-serif text-xl font-semibold">{t ? '경력' : 'Work Experience'}</h2>
          <span className="text-sm text-muted">{totalCareerDuration(lang)}</span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">NDS</p>
              <p className="text-xs text-muted whitespace-nowrap">2022.07 — {t ? '현재' : 'Present'} <span className="text-accent">{calcDuration('2022-07-15', null, lang)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? '클라우드기술팀 · 매니저' : 'Cloud Technology Team · Manager'}</p>
            <p className="text-sm text-fg/80">{t ? 'AWS Infra·Data Pipeline·DW·BI 대외구축, 사내 빌링·테크블로그·JIRA·영업대시보드 개발' : 'AWS infra, data pipelines, DW/BI delivery; in-house billing, tech blog, JIRA, sales dashboard'}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">Maven Cloud Service</p>
              <p className="text-xs text-muted whitespace-nowrap">2021.08 — 2021.12 <span className="text-accent">{calcDuration('2021-08-26', '2021-12-07', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? 'PowerPlatform · 프로' : 'PowerPlatform · Pro'}</p>
            <p className="text-sm text-fg/80">{t ? 'Microsoft Power Automate 기반 업무 자동화 솔루션 구축' : 'Business automation solutions with Microsoft Power Automate'}</p>
          </div>
        </div>
      </section>

      {/* 학력 */}
      <section id="resume-school">
        <h2 className="font-serif text-xl font-semibold mb-4 pb-2 border-b border-border">{t ? '학력' : 'Education'}</h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '홍익대학교' : 'Hongik University'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2012.03 — 2019.02 <span className="text-accent">{calcDuration('2012-03-02', '2019-02-22', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? '컴퓨터정보통신공학과 · 학사 졸업' : 'B.E. Computer Information & Communication Engineering'}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '안곡고등학교' : 'Angok High School'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2009.03 — 2012.02 <span className="text-accent">{calcDuration('2009-03-02', '2012-02-09', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? '인문계 · 졸업' : 'Liberal Arts · Graduated'}</p>
          </div>
        </div>
      </section>

      {/* 인턴/아르바이트 */}
      <section>
        <h2 className="font-serif text-xl font-semibold mb-4 pb-2 border-b border-border">
          {t ? '인턴 및 아르바이트' : 'Internships & Part-time'}
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '에듀니티랩 (이노베이션 아카데미 외주)' : 'Edunity Lab (Innovation Academy outsourcing)'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2023.10 — 2023.11 <span className="text-accent">{calcDuration('2023-10-16', '2023-11-03', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? 'Seoul42 Java 과정 전문가 문제 검증' : 'Seoul42 Java curriculum expert problem validation'}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '세종특별자치시청 보안관제센터' : 'Sejong City Security Operations Center'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2018.12 — 2019.01 <span className="text-accent">{calcDuration('2018-12-17', '2019-01-18', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">{t ? '보안 관제 인턴 (체험형)' : 'Security monitoring intern'}</p>
          </div>
        </div>
      </section>

      {/* 병역 */}
      <section id="resume-military">
        <h2 className="font-serif text-xl font-semibold mb-4 pb-2 border-b border-border">{t ? '병역' : 'Military Service'}</h2>
        <div>
          <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
            <p className="font-semibold text-fg">{t ? '대한민국 육군' : 'Republic of Korea Army'}</p>
            <p className="text-xs text-muted whitespace-nowrap">2014.04 — 2016.01 <span className="text-accent">{calcDuration('2014-04-01', '2016-01-01', lang)}</span></p>
          </div>
          <p className="text-sm text-muted">{t ? '25사단 수색대대 · 병장 만기전역' : '25th Division Reconnaissance Battalion · Sergeant, Honorable Discharge'}</p>
        </div>
      </section>

      {/* 교육 */}
      <section id="resume-training">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <h2 className="font-serif text-xl font-semibold">{t ? '교육' : 'Training'}</h2>
          <span className="text-sm text-muted">{totalEduDuration(lang)}</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '삼성 청년 소프트웨어 아카데미 (SSAFY)' : 'Samsung SW Academy For Youth (SSAFY)'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2022.01 — 2022.07 <span className="text-accent">{calcDuration('2022-01-05', '2022-07-14', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">Java, Algorithm, Spring, Vue (1,000{t ? '시간' : 'hrs'})</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '프로젝트형 클라우드(MSA) 서비스 개발' : 'Cloud (MSA) Service Development'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2020.12 — 2021.06 <span className="text-accent">{calcDuration('2020-12-28', '2021-06-04', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">HTML, CSS, JS, Django, React, AWS, Docker, Kubernetes (880{t ? '시간' : 'hrs'})</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '빅데이터 활용(딥러닝) AI 설계' : 'Big Data & Deep Learning AI Design'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2019.04 — 2019.11 <span className="text-accent">{calcDuration('2019-04-22', '2019-11-27', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">Python, Azure, R, TensorFlow, Keras, Computer Vision (1,184{t ? '시간' : 'hrs'})</p>
          </div>
        </div>
      </section>

      {/* 해외 경험 */}
      <section id="resume-abroad">
        <h2 className="font-serif text-xl font-semibold mb-4 pb-2 border-b border-border">{t ? '해외 경험' : 'International Experience'}</h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '호주 워킹홀리데이' : 'Australia Working Holiday'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2017.03 — 2018.02 <span className="text-accent">{calcDuration('2017-03-01', '2018-02-01', lang)}</span></p>
            </div>
            <p className="text-sm text-muted">NSW Goulburn → NSW Sydney → NT Uluru → VIC Melbourne → TAS Hobart</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-x-4 flex-wrap">
              <p className="font-semibold text-fg">{t ? '호주 여행' : 'Australia Travel'}</p>
              <p className="text-xs text-muted whitespace-nowrap">2019.01 — 2019.03 <span className="text-accent">{calcDuration('2019-01-27', '2019-03-26', lang, true)}</span></p>
            </div>
            <p className="text-sm text-muted">SA Adelaide → Kangaroo Island</p>
          </div>
        </div>
      </section>

      {/* 자격증 */}
      <section>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <h2 className="font-serif text-xl font-semibold">{t ? '자격증' : 'Certifications'}</h2>
          <span className="text-sm text-muted">{CERTS.length}{t ? '개' : ' total'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="pb-2 pr-4 font-medium">{t ? '자격명' : 'Certification'}</th>
                <th className="pb-2 pr-4 font-medium hidden sm:table-cell">{t ? '발급기관' : 'Issuer'}</th>
                <th className="pb-2 pr-4 font-medium">{t ? '취득일' : 'Issued'}</th>
                <th className="pb-2 font-medium">{t ? '만료일' : 'Expires'}</th>
              </tr>
            </thead>
            <tbody>
              {CERTS.map((c) => (
                <tr key={c.aka} className="border-b border-border/50 hover:bg-fg/5 transition-colors">
                  <td className="py-2 pr-4">
                    <span className="font-medium text-fg">{c.aka}</span>
                    <span className="block text-xs text-muted leading-snug">{c.name}</span>
                  </td>
                  <td className="py-2 pr-4 text-muted hidden sm:table-cell">{c.issuer}</td>
                  <td className="py-2 pr-4 text-muted whitespace-nowrap">{c.issued}</td>
                  <td className="py-2 text-muted whitespace-nowrap">{c.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 어학 */}
      <section>
        <h2 className="font-serif text-xl font-semibold mb-4 pb-2 border-b border-border">
          {t ? '어학' : 'Language'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="pb-2 pr-4 font-medium">{t ? '시험명' : 'Test'}</th>
                <th className="pb-2 pr-4 font-medium hidden sm:table-cell">{t ? '발급기관' : 'Issuer'}</th>
                <th className="pb-2 pr-4 font-medium">{t ? '등급/점수' : 'Score'}</th>
                <th className="pb-2 font-medium">{t ? '취득일' : 'Issued'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">
                  <span className="font-medium text-fg">TOEIC Speaking</span>
                  <span className="block text-xs text-muted leading-snug">Test of English for International Communication</span>
                </td>
                <td className="py-2 pr-4 text-muted hidden sm:table-cell">ETS</td>
                <td className="py-2 pr-4 text-muted whitespace-nowrap">Level 5 (120{t ? '점' : ' pts'})</td>
                <td className="py-2 text-muted whitespace-nowrap">2020.03.22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    {/* Floating back button */}
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-200 ${showBack ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <button
        onClick={() => {
          const el = document.getElementById('resume-top');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          }
          setShowBack(false);
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-fg text-bg text-sm font-medium shadow-lg hover:opacity-90 active:scale-95 transition-all"
      >
        ↑ {t ? '돌아가기' : 'Back to timeline'}
      </button>
    </div>
    </div>
  );
}

function AdTab({ lang }: { lang: Lang }) {
  const t = lang === 'ko';
  const skills = [
    { category: t ? '클라우드' : 'Cloud', items: ['AWS (SAP·DOP)', 'Google Cloud', 'Snowflake'] },
    { category: t ? '데이터' : 'Data', items: ['Data Pipeline', 'BI', 'SQL / SQLD'] },
    { category: t ? '개발' : 'Dev', items: ['Python', 'JavaScript / React', 'Next.js', 'Java'] },
    { category: t ? '인프라' : 'Infra', items: ['Linux', 'Docker', 'Kubernetes', 'Git'] },
  ];
  return (
    <div className="space-y-10">
      {/* Headline */}
      <div className="rounded-2xl border border-border p-6 sm:p-8 bg-fg/[0.02]">
        <p className="text-sm text-muted mb-2">{t ? '데이터 엔지니어' : 'Data Engineer'}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-fg mb-4">
          {t ? '클라우드·데이터·개발 세 축을\n동시에 다룹니다.' : 'Cloud. Data. Dev.\nAll three, in one.'}
        </h2>
        <p className="text-muted leading-relaxed max-w-xl">
          {t
            ? 'AWS/GCP 인프라 설계부터 데이터 파이프라인, 내부 시스템 개발까지 — NDS에서 클라우드 기술팀 매니저로 전 영역을 직접 운영하고 있습니다.'
            : 'From AWS/GCP infrastructure design to data pipelines and internal tooling — currently managing end-to-end at NDS (Nongshim Data Systems) as a Cloud Tech Manager.'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { n: '4+', label: t ? '재직 연수' : 'Years at NDS' },
          { n: '8', label: t ? '보유 자격증' : 'Certifications' },
          { n: '3+', label: t ? '교육 과정' : 'Training programs' },
          { n: '2', label: t ? '해외 체류 경험' : 'Countries lived' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-4 text-center">
            <p className="font-serif text-3xl font-semibold text-accent">{s.n}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Certs highlight */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">{t ? '주요 자격증' : 'Key Certifications'}</h3>
        <div className="flex flex-wrap gap-2">
          {['AWS DOP', 'AWS SAP', 'Snowflake ADA', 'GC-SecOps', 'GWDS', '정보처리기사', 'SQLD'].map((cert) => (
            <span key={cert} className="px-3 py-1.5 rounded-full text-xs font-medium border border-accent/40 text-accent bg-accent/5">
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">{t ? '기술 스택' : 'Tech Stack'}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((s) => (
            <div key={s.category} className="rounded-xl border border-border p-4">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">{s.category}</p>
              <ul className="space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-fg/80">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <p className="font-semibold text-fg">{t ? '협업·문의' : 'Get in touch'}</p>
          <p className="text-sm text-muted">wansang93@naver.com</p>
        </div>
        <a
          href="mailto:wansang93@naver.com"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          {t ? '이메일 보내기' : 'Send Email'}
        </a>
      </div>
    </div>
  );
}

function PhotoGridItem({ filename, onSelect }: { filename: string; onSelect: (filename: string) => void }) {
  const [isLandscape, setIsLandscape] = useState(false);
  const encodedName = encodeURIComponent(filename);
  const src = `/photos/${encodedName}`;
  return (
    <button
      className="group relative aspect-square block overflow-hidden rounded-lg bg-border/20 cursor-zoom-in focus:outline-none"
      onClick={() => onSelect(filename)}
      aria-label={filename}
    >
      {isLandscape && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-70"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={filename}
        className={`absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105 ${isLandscape ? 'object-contain' : 'object-cover'}`}
        loading="lazy"
        onLoad={(e) => {
          const img = e.currentTarget;
          setIsLandscape(img.naturalWidth > img.naturalHeight);
        }}
      />
    </button>
  );
}

function PhotoTab({ lang }: { lang: Lang }) {
  const t = lang === 'ko';
  const [selected, setSelected] = useState<string | null>(null);
  const { state } = useMissions();
  const unlocked = allMissionsCompleted(state);
  const completedCount = MISSIONS.filter((m) => state[m.id]).length;

  if (!unlocked) {
    return (
      <div className="rounded-xl border border-border p-8 text-center">
        <p className="text-3xl mb-3">🔒</p>
        <p className="font-semibold text-fg mb-1">
          {t ? '모든 미션을 완료하면 사진첩이 열립니다' : 'Complete every mission to unlock the photo album'}
        </p>
        <p className="text-sm text-muted">
          {t
            ? `현재 ${completedCount} / ${MISSIONS.length}개 완료 — 풋터의 미션 페이지에서 확인할 수 있어요.`
            : `${completedCount} / ${MISSIONS.length} completed — check the mission page linked in the footer.`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {PHOTOS.map((filename) => (
          <PhotoGridItem key={filename} filename={filename} onSelect={setSelected} />
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/photos/${encodeURIComponent(selected)}`}
            alt={selected}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-white/70"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

type TabId = 'resume' | 'ad' | 'photo';

export default function AboutTabs({ lang }: Props) {
  const t = lang === 'ko';
  const tabs: { id: TabId; label: string }[] = [
    { id: 'resume', label: t ? '이력서' : 'Resume' },
    { id: 'ad', label: 'PPT' },
    { id: 'photo', label: t ? '사진첩' : 'Photos' },
  ];

  const [active, setActive] = useState<TabId>('resume');

  // URL 쿼리스트링에서 초기 탭 읽기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as TabId | null;
    if (tab === 'resume' || tab === 'ad' || tab === 'photo') setActive(tab);
  }, []);

  // 브라우저 뒤로가기/앞으로가기 대응
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab') as TabId | null;
      setActive(tab === 'resume' || tab === 'ad' || tab === 'photo' ? tab : 'resume');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleTabChange = (tabId: TabId) => {
    setActive(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative focus:outline-none ${
              active === tab.id
                ? 'text-fg'
                : 'text-muted hover:text-fg'
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === 'resume' && <ResumeTab lang={lang} />}
      {active === 'ad' && <AdTab lang={lang} />}
      {active === 'photo' && <PhotoTab lang={lang} />}
    </div>
  );
}
