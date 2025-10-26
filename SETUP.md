# CORRECT 프로젝트 설정 가이드

## 📋 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# API 키 (하드웨어 팀용)
API_SECRET_KEY=your-custom-secret-api-key
```

### Supabase 설정값 찾기

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. Settings → API 메뉴
4. 다음 값들 복사:
    - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
    - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - service_role (주의: 비공개) → `SUPABASE_SERVICE_ROLE_KEY`

### API 키 생성

`API_SECRET_KEY`는 직접 만드세요. 예시:

```bash
# 랜덤 문자열 생성 (Linux/Mac)
openssl rand -base64 32
```

---

## 🗄️ 데이터베이스 설정

### 1. Supabase SQL Editor에서 실행

1. Supabase Dashboard → SQL Editor
2. `supabase-schema.sql` 파일의 내용을 복사
3. SQL Editor에 붙여넣기
4. Run 버튼 클릭

이렇게 하면:

-   3개의 테이블 생성 (devices, posture_data, stretching_recommendations)
-   초기 데이터 삽입 (장치 2개)
-   인덱스 및 트리거 설정
-   Row Level Security 활성화

### 2. 데이터 확인

1. Supabase Dashboard → Table Editor
2. `devices`, `posture_data`, `stretching_recommendations` 테이블 확인
3. 각 테이블에 데이터가 있는지 확인

---

## 🚀 프로젝트 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

```
http://localhost:3000
```

---

## ✅ 동작 확인

### 1. 장치 목록 확인

-   `/devices` 페이지 접속
-   Supabase에서 가져온 장치 2개가 표시되는지 확인

### 2. 장치 상세 페이지 확인

-   장치 카드 클릭
-   배터리, 자세 데이터, 스트레칭 추천이 표시되는지 확인

### 3. API 테스트

```bash
# 배터리 업데이트 테스트
curl -X PUT http://localhost:3000/api/device/1 \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-custom-secret-api-key" \
  -d '{"battery_level": 95}'
```

성공 응답이 오면 정상입니다!

---

## 🐛 문제 해결

### "Missing Supabase environment variables" 오류

-   `.env.local` 파일이 생성되었는지 확인
-   환경 변수명이 정확한지 확인
-   개발 서버를 재시작 (`npm run dev` 다시 실행)

### "Invalid or missing API key" 오류

-   API 요청에 `X-API-Key` 헤더가 포함되었는지 확인
-   헤더 값이 `.env.local`의 `API_SECRET_KEY`와 일치하는지 확인

### 데이터가 표시되지 않음

-   Supabase Dashboard에서 데이터가 있는지 확인
-   브라우저 콘솔에서 에러 메시지 확인
-   Network 탭에서 API 요청 상태 확인

---

## 📱 모바일 테스트

### 로컬 네트워크에서 테스트

1. PC의 IP 주소 확인:

```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. 핸드폰에서 접속:

```
http://your-ip-address:3000
```

예: `http://192.168.0.10:3000`

---

## 🔐 보안 주의사항

1. **절대 공개하지 말것**:

    - `.env.local` 파일
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `API_SECRET_KEY`

2. **Git에 추가하지 말것**:

    - `.env.local` 파일은 `.gitignore`에 이미 포함되어 있음
    - 실수로 커밋하지 않도록 주의

3. **프로덕션 배포시**:
    - Vercel/Netlify 등의 환경 변수 설정 사용
    - API 키는 주기적으로 변경

---

## 📚 추가 문서

-   [API 문서](./README_API.md) - 하드웨어 팀용 API 가이드
-   [README](./README.md) - 프로젝트 전체 개요
-   [Supabase 공식 문서](https://supabase.com/docs)

문제가 해결되지 않으면 팀원에게 문의하세요!
