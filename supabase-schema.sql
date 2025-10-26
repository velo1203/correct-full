-- CORRECT 자세 교정 의자 데이터베이스 스키마

-- 장치 테이블
CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    battery_level INTEGER NOT NULL DEFAULT 100 CHECK (battery_level >= 0 AND battery_level <= 100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(50) NOT NULL DEFAULT '정상',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 자세 데이터 테이블
CREATE TABLE IF NOT EXISTS posture_data (
    id SERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    posture_score VARCHAR(20) NOT NULL DEFAULT '자세 좋음',
    statistics_hours INTEGER NOT NULL DEFAULT 3,
    chart_data JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 스트레칭 추천 테이블
CREATE TABLE IF NOT EXISTS stretching_recommendations (
    id SERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    recommendation_text TEXT NOT NULL,
    stretch_type VARCHAR(50) NOT NULL DEFAULT '무릎 꿇어앉기',
    duration_seconds INTEGER NOT NULL DEFAULT 10,
    frequency VARCHAR(50) NOT NULL DEFAULT '아침 저녁',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_devices_id ON devices(id);
CREATE INDEX idx_posture_data_device_id ON posture_data(device_id);
CREATE INDEX idx_stretching_device_id ON stretching_recommendations(device_id);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posture_data_updated_at BEFORE UPDATE ON posture_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stretching_updated_at BEFORE UPDATE ON stretching_recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입
INSERT INTO devices (id, name, battery_level, is_active, status) VALUES
    (1, 'CORRECT 모델1', 84, true, '상태 청결중'),
    (2, 'CORRECT 모델2', 23, true, '상태 점검');

INSERT INTO posture_data (device_id, posture_score, statistics_hours, chart_data) VALUES
    (1, '자세 좋음', 3, '[40, 30, 50, 35, 60, 45, 70, 55, 40, 65]'),
    (2, '자세 나쁨', 3, '[20, 15, 25, 18, 30, 22, 35, 28, 20, 32]');

INSERT INTO stretching_recommendations (device_id, recommendation_text, stretch_type, duration_seconds, frequency) VALUES
    (1, '허리 통증 완화를 위해 아침 저녁으로 무릎 꿇어앉기 스트레칭을 10초씩 해보세요.', '무릎 꿇어앉기', 10, '아침 저녁'),
    (2, '목 통증 완화를 위해 점심 저녁으로 목 스트레칭을 15초씩 해보세요.', '목 스트레칭', 15, '점심 저녁');

-- Row Level Security (RLS) 활성화
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE posture_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE stretching_recommendations ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모두에게 허용)
CREATE POLICY "Enable read access for all users" ON devices FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON posture_data FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON stretching_recommendations FOR SELECT USING (true);

-- 쓰기 권한은 API를 통해서만 (서비스 키 필요)

