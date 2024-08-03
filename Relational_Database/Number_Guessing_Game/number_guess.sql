--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users_data; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users_data (
    user_id integer NOT NULL,
    username character varying(22) NOT NULL,
    games_played integer NOT NULL,
    best_game integer NOT NULL
);


ALTER TABLE public.users_data OWNER TO freecodecamp;

--
-- Name: users_data_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_data_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_data_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_data_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_data_user_id_seq OWNED BY public.users_data.user_id;


--
-- Name: users_data user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users_data ALTER COLUMN user_id SET DEFAULT nextval('public.users_data_user_id_seq'::regclass);


--
-- Data for Name: users_data; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users_data VALUES (1, 'Javi', 1, 20);
INSERT INTO public.users_data VALUES (2, 'asdf', 0, 0);
INSERT INTO public.users_data VALUES (3, 'asdfeee', 0, 0);
INSERT INTO public.users_data VALUES (4, 'user_1722694118287', 0, 0);
INSERT INTO public.users_data VALUES (5, 'user_1722694118286', 0, 0);
INSERT INTO public.users_data VALUES (6, '1234567890123456789000', 0, 0);
INSERT INTO public.users_data VALUES (7, 'dfas', 0, 0);
INSERT INTO public.users_data VALUES (8, 'JAVI', 0, 0);
INSERT INTO public.users_data VALUES (9, 'user_1722694681413', 0, 0);
INSERT INTO public.users_data VALUES (10, 'user_1722694681412', 0, 0);
INSERT INTO public.users_data VALUES (11, 'user_1722694732060', 0, 0);
INSERT INTO public.users_data VALUES (12, 'user_1722694732059', 0, 0);
INSERT INTO public.users_data VALUES (13, 'FA', 0, 0);
INSERT INTO public.users_data VALUES (14, 'ASDFA', 0, 0);
INSERT INTO public.users_data VALUES (15, 'ASD', 0, 0);
INSERT INTO public.users_data VALUES (16, 'QW', 0, 0);
INSERT INTO public.users_data VALUES (17, 'EWEWWEEEEEWEWQWQQWW', 0, 0);
INSERT INTO public.users_data VALUES (18, 'QWQWQ', 0, 0);
INSERT INTO public.users_data VALUES (19, 'QWEWQWWQWW', 0, 0);
INSERT INTO public.users_data VALUES (20, 'QWEWWW', 0, 0);
INSERT INTO public.users_data VALUES (21, 'QWERTYUIO', 0, 0);
INSERT INTO public.users_data VALUES (22, 'QWERTYUI', 0, 0);
INSERT INTO public.users_data VALUES (23, 'qasdrtau', 0, 0);
INSERT INTO public.users_data VALUES (24, 'user_1722695184840', 0, 0);
INSERT INTO public.users_data VALUES (25, 'user_1722695184839', 0, 0);
INSERT INTO public.users_data VALUES (26, 'user_1722695646236', 0, 0);
INSERT INTO public.users_data VALUES (27, 'user_1722695646235', 0, 0);
INSERT INTO public.users_data VALUES (28, 'trere', 0, 0);
INSERT INTO public.users_data VALUES (29, 'werqw', 0, 0);
INSERT INTO public.users_data VALUES (30, 'adfw', 0, 0);
INSERT INTO public.users_data VALUES (31, 'qwe', 0, 0);
INSERT INTO public.users_data VALUES (32, 'rted', 0, 0);
INSERT INTO public.users_data VALUES (33, 'trino', 0, 0);
INSERT INTO public.users_data VALUES (34, 'user_1722697052728', 0, 0);
INSERT INTO public.users_data VALUES (35, 'user_1722697052727', 0, 0);
INSERT INTO public.users_data VALUES (36, 'user_1722697196681', 0, 0);
INSERT INTO public.users_data VALUES (37, 'user_1722697196680', 0, 0);
INSERT INTO public.users_data VALUES (39, 'user_1722698381916', 2, 0);
INSERT INTO public.users_data VALUES (38, 'user_1722698381917', 5, 0);
INSERT INTO public.users_data VALUES (40, 'aasdf', 1, 0);
INSERT INTO public.users_data VALUES (42, 'user_1722698529655', 2, 379);
INSERT INTO public.users_data VALUES (41, 'user_1722698529656', 5, 878);
INSERT INTO public.users_data VALUES (44, 'user_1722698818174', 2, 936);
INSERT INTO public.users_data VALUES (43, 'user_1722698818175', 5, 917);


--
-- Name: users_data_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_data_user_id_seq', 44, true);


--
-- Name: users_data users_data_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users_data
    ADD CONSTRAINT users_data_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

