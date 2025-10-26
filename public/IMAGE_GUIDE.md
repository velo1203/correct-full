# 이미지 가이드

이 폴더에 다음 이미지들을 추가하세요:

## 필요한 이미지

1. **chair.png** - CORRECT 스마트 의자 이미지
    - 권장 크기: 512x512px
    - 배경: 투명 또는 흰색
    - 사용 위치:
        - 페어링 화면
        - 내 장치들 목록
        - 내 교정기 상세 화면

## 이미지 추가 후 사용 방법

각 컴포넌트에서 플레이스홀더를 다음과 같이 교체하세요:

### 현재 (플레이스홀더)

\`\`\`tsx

<div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
  <span className="text-gray-400 text-sm">의자 이미지</span>
</div>
\`\`\`

### 이미지 추가 후

\`\`\`tsx
import Image from 'next/image'

<Image 
  src="/chair.png" 
  alt="CORRECT 의자"
  width={192}
  height={192}
  className="rounded-lg"
/>
\`\`\`
