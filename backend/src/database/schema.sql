
CREATE TABLE IF NOT EXISTS lead_master (
    id          SERIAL PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(20)  NOT NULL UNIQUE,
    email       VARCHAR(100),
    source      VARCHAR(50),
    status      VARCHAR(50)  NOT NULL DEFAULT 'new',
    assigned_to VARCHAR(100),
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_full_name
    ON lead_master (full_name);

CREATE INDEX IF NOT EXISTS idx_lead_phone
    ON lead_master (phone);

CREATE INDEX IF NOT EXISTS idx_lead_status
    ON lead_master (status);

CREATE INDEX IF NOT EXISTS idx_lead_source
    ON lead_master (source);

CREATE INDEX IF NOT EXISTS idx_lead_created_at
    ON lead_master (created_at);

CREATE INDEX IF NOT EXISTS idx_lead_status_source
    ON lead_master (status, source);