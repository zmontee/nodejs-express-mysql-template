SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

USE database;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(200) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `available` int(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `login`, `password`, `available`, `name`, `role`) VALUES
(1, 'admin', '4287f878a23e8375eeef25dbdeb501d3', 1,  'Admin', 'superadmin');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;