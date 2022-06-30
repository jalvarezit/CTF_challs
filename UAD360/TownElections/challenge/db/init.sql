CREATE TABLE candidates (
    id INT NOT NULL AUTO_INCREMENT,
    cand_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE flag (
    id INT NOT NULL AUTO_INCREMENT,
    flag VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO candidates (cand_name) VALUES
    ('Jesupinho'), ('SrBlue'), ('EvilRois'), ('esTsech'), ('W4nn4l1ve'),
    ('JoseWise'), ('Er_Goth4'), ('4m0ry4rt3'), ('Israel'), ('4nth0nyTow3rs');

INSERT INTO flag (flag) VALUES
    ('UAD360{CsrF_1s_n0t_3n0ugh}');

CREATE EVENT cleaning ON SCHEDULE EVERY 1 MINUTE ENABLE
  DO 
  DELETE FROM candidates;
