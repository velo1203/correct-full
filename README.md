# CORRECT - 자세 교정 스마트 의자 앱

Next.js 기반의 모바일 웹 애플리케이션입니다.

## ✨ 주요 특징

### 🎨 디자인 시스템

-   **폰트**: Pretendard (한글 최적화)
-   **색상 팔레트**:
    -   Primary: `#5C8FFA` (파란색)
    -   Secondary: `#4C3C3F` (다크 그레이)
    -   Gray: `#6A6A83` / Light: `#A8BFC2` / Lighter: `#F2F2F2`
    -   Background: `#F2F3F7`
-   **쉐도우 제거**: 모든 쉐도우를 제거하고 border로 대체
-   **애니메이션**: fade-in, slide-up, slide-down, scale-in

### 🎭 애니메이션

-   **페이지 전환**: 부드러운 fade-in 효과
-   **컴포넌트 등장**: slide-up 애니메이션
-   **인터랙션**: hover, active 상태 트랜지션
-   **차트**: 순차적 애니메이션 (staggered animation)

### 📦 컴포넌트 구조

-   **모듈화**: 각 페이지별 재사용 가능한 컴포넌트 분리
-   **가독성**: 명확한 컴포넌트 네이밍과 구조
-   **타입 안정성**: TypeScript 인터페이스 정의

## 📱 화면 구성

### 1. 스플래시 화면 (`/splash`)

-   CORRECT 로고와 슬로건
-   fade-in, scale-in 애니메이션
-   2초 후 자동으로 로그인 화면 이동

### 2. 로그인 화면 (`/login`)

-   아이디/패스워드 입력
-   Focus 시 border 색상 변경
-   버튼 active 애니메이션

### 3. 내 장치들 (`/devices`)

-   연결된 CORRECT 기기 목록
-   배터리 상태 및 상태 표시
-   DeviceCard 컴포넌트로 모듈화
-   순차적 등장 애니메이션

### 4. 페어링 화면 (`/pairing`)

-   블루투스 연결 가이드
-   기기 페어링 방법 안내
-   아이콘과 텍스트 조합

### 5. 내 교정기 상세 (`/device/[id]`)

-   배터리 충전 상태 (BatteryCard)
-   활성 상태 토글 (ToggleSwitch)
-   자세 상태 기록 차트 (PostureChart)
-   스트레칭 추천 (Section)

## 🚀 시작하기

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

## 🎨 디자인 가이드

### 색상 사용

```tsx
// Primary - 주요 액션, 강조
className = "text-primary bg-primary";

// Secondary - 보조 버튼
className = "bg-secondary";

// Gray - 텍스트, 비활성
className = "text-gray";

// Background - 배경
className = "bg-background";
```

### 애니메이션 사용

```tsx
// 페이지 진입
className = "animate-fade-in";

// 컴포넌트 등장
className = "animate-slide-up";

// 헤더 등장
className = "animate-slide-down";

// 스케일 효과
className = "animate-scale-in";
```

### 인터랙션

```tsx
// 호버 효과
className = "hover:border-primary hover:opacity-90";

// 클릭 효과
className = "active:scale-[0.98]";

// 트랜지션
className = "transition-all transition-colors";
```

## 📂 프로젝트 구조

```
correct-full/
├── src/
│   └── app/
│       ├── layout.tsx          # 메인 레이아웃 + Pretendard 폰트
│       ├── globals.css         # 글로벌 스타일
│       ├── page.tsx            # 루트 (splash로 리다이렉트)
│       ├── splash/             # 스플래시 화면
│       ├── login/              # 로그인 화면
│       ├── devices/            # 장치 목록 (DeviceCard 컴포넌트)
│       ├── pairing/            # 페어링 화면
│       └── device/[id]/        # 상세 화면 (여러 서브 컴포넌트)
├── public/                     # 이미지 폴더
├── tailwind.config.ts          # Tailwind 설정 (색상, 애니메이션)
└── package.json
```

## 🖼️ 이미지 추가 방법

`public/chair.png` 파일을 추가하세요. 현재는 플레이스홀더로 공간이 확보되어 있습니다.

## 🎯 컴포넌트 예시

### BatteryCard

```tsx
<BatteryCard label="배터리 충전" value="84%" icon={<div>🔋</div>} />
```

### ToggleSwitch

```tsx
<ToggleSwitch enabled={true} />
```

### Section

```tsx
<Section title="배터리">{/* 내용 */}</Section>
```

## 🛠 기술 스택

-   **프레임워크**: Next.js 14 (App Router)
-   **언어**: TypeScript
-   **스타일링**: Tailwind CSS
-   **폰트**: Pretendard
-   **아이콘**: Font Awesome
-   **애니메이션**: Tailwind 커스텀 애니메이션

## 🎨 개선 사항

✅ Pretendard 폰트 적용
✅ 새로운 색상 팔레트 (디자인 시스템 준수)
✅ 모든 shadow 제거 및 border로 대체
✅ 페이지별 애니메이션 추가
✅ 컴포넌트 모듈화 및 가독성 향상
✅ hover/active 인터랙션 개선
✅ TypeScript 인터페이스 정의

## 🔜 향후 기능 추가 예정

-   블루투스 연결 기능
-   실시간 자세 데이터 수집
-   사용자 인증 시스템
-   데이터 저장 및 분석
-   알림 기능
-   차트 라이브러리 통합 (Recharts 등)
