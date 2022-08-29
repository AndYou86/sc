
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `api_users` (
  `id` int NOT NULL,
  `login` char(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `api_users` (`id`, `login`, `password`, `token`) VALUES
(3, 'a', '29', NULL),
(5, '1a', 'd', NULL),
(13, '1da', 'd', NULL),
(15, '1dda', '2', NULL),
(16, 'add', 'ddd', NULL),
(18, 'addd', 'ddd', NULL),
(19, 'test', '$2y$11$rp9y07JSgeVJB6tRZdDgQO.LEl4alcMoO6u5LGiTZV4WvvEieGZ.u', NULL),
(20, 'test1', '$2y$11$3.K54jHT8nGT.Q4MI4VhOeptGmb7nWUVyGEUv1IYYTJY/urLw6EJK', NULL),
(22, 'test1d', '$2y$11$vCN1HCsKSesO.tQFm3qvducc348E0Co1.8A/dYOvVaiJbYGwv.hja', NULL),
(23, 'test1de', '$2y$11$oWcrS/lyl0NM3gngcgn3OOBVwwQ2gwOfCZmK.XUVU9mJ2XWx58ogu', NULL),
(24, 'tesft1de', '$2y$11$ulHw8Ihvg/vKfzm0ZrlXYeFSnNJ7QrLQ.FXFwJNCzQhK7.Vahu09O', NULL),
(25, 'tesfgt1de', '$2y$11$VpvsdpSJef4VJIA8xgt67OkdYTxHNp/VyjWSmzBBgvdS7Y3FrUfQG', NULL),
(26, 'admin', '$2y$11$qMbCObFpdQcD6xRpoAXiruqvPXQH.OxuoGNFIAa3VMSCPZsHunTOu', '$2y$11$1ZyBaDLV02JvDgpoupLhR.EFhkGPqDWnZ1Yq8RLWdlJGMBhOU/kSe'),
(27, 'admin1', '$2y$11$0KnwKHmQmlm5ya2Sms6wL.eiRYf3SDuaCIL8jdUfPVYelZOeVOtMG', NULL);

CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `nick` varchar(200) DEFAULT NULL,
  `surname` varchar(200) NOT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `id_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `students` (`id`, `name`, `nick`, `surname`, `sex`, `id_user`) VALUES
(1, 'petr', 'u1', 'asdf', NULL, NULL),
(2, 'asd', 'u2', 'affwefaw', NULL, NULL),
(3, 'petr', 'u3', 'asdf', NULL, NULL),
(4, 'asd', 'u4', 'affwefaw', NULL, NULL);


ALTER TABLE `api_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);


ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);


ALTER TABLE `api_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;


ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `students`
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `api_users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
COMMIT;

