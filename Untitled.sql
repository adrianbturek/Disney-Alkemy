CREATE DATABASE  IF NOT EXISTS `Disney` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Disney`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: Disney
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'Disney'
--
/*!50003 DROP PROCEDURE IF EXISTS `DetallePeliculas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DetallePeliculas`(IN idPelicula INT)
IF idPelicula=0 THEN

 Select JSON_Object("id",pel.id,"titulo",pel.titulo,"Fecha_Creacion",pel.fecha_creacion,"calificacion",pel.calificacion,"imagen",pel.imagen,
			"personajes",
			(Select JSON_Arrayagg(JSON_Object("Personaje",pe.nombre))
			FROM Disney.Peliculas p 
			INNER JOIN Disney.peliculas_personajes pp 
					ON p.id=pp.id_pelicula
					INNER JOIN Disney.personajes pe 
							ON pe.id=pp.id_personaje
			WHERE p.id=pel.id),
            "genero",
            (Select g.nombre
            FROM Disney.peliculas peli
				INNER JOIN Disney.Generos g
						ON peli.idgenero=g.id
            WHERE peli.id=pel.id)
			)
			AS dato
			FROM Disney.Peliculas pel;
       
ELSE
       Select JSON_Object("id",pel.id,"titulo",pel.titulo,"Fecha_Creacion",pel.fecha_creacion,"calificacion",pel.calificacion,"imagen",pel.imagen,
			"personajes",
			(Select JSON_Arrayagg(JSON_Object("Personaje",pe.nombre))
			FROM Disney.Peliculas p 
			INNER JOIN Disney.peliculas_personajes pp 
					ON p.id=pp.id_pelicula
					INNER JOIN Disney.personajes pe 
							ON pe.id=pp.id_personaje
			WHERE p.id=pel.id),
            "genero",
            (Select g.nombre
            FROM Disney.peliculas peli
				INNER JOIN Disney.Generos g
						ON peli.idgenero=g.id
            WHERE peli.id=pel.id)
			)
			AS dato
			FROM Disney.Peliculas pel
			WHERE pel.id=idPelicula;
		
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DetallePersonaje` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DetallePersonaje`(IN idPersonaje INT)
BEGIN
	SELECT Disney.Personajes.*,Disney.Peliculas.* 
		FROM Personajes, Peliculas,Peliculas_Personajes 
        WHERE Personajes.Id=idPersonaje
          And Personajes.Id=Peliculas_Personajes.Id_Personaje 
          AND Peliculas_Personajes.Id_Pelicula=Peliculas.Id ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DetallePersonaje2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DetallePersonaje2`(IN idPersonaje INT)
IF idpersonaje=0 THEN
	Select JSON_Object("id",per.id,"nombre",per.nombre,"imagen",per.imagen,"edad",per.edad,"peso",per.peso,"historia",per.historia,
		"peliculas",
		(Select JSON_Arrayagg(JSON_Object("Pelicula",pe.titulo))
		FROM Disney.personajes p 
		INNER JOIN Disney.peliculas_personajes pp 
				ON p.id=pp.id_personaje 
				INNER JOIN Disney.peliculas pe 
						ON pe.id=pp.id_pelicula 
		WHERE p.id=per.id )             
	) 
		AS dato
		FROM Disney.Personajes per;
        
ELSE

	Select JSON_Object("id",per.id,"nombre",per.nombre,"imagen",per.imagen,"edad",per.edad,"peso",per.peso,"historia",per.historia,
			"peliculas",
			(Select JSON_Arrayagg(JSON_Object("Pelicula",pe.titulo))
			FROM Disney.personajes p 
			INNER JOIN Disney.peliculas_personajes pp 
					ON p.id=pp.id_personaje 
					INNER JOIN Disney.peliculas pe 
							ON pe.id=pp.id_pelicula 
			WHERE p.id=per.id )             
		) 
			AS dato
			FROM Disney.Personajes per
			WHERE per.id=idpersonaje;
	
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PeliculasxGenero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PeliculasxGenero`(IN idgenero INT)
BEGIN
	SELECT * 
		FROM Disney.Peliculas, Disney.Generos
        WHERE Disney.Generos.id = idgenero
          AND Disney.Generos.id = Disney.Peliculas.idgenero;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PersonajesxPelicula` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PersonajesxPelicula`(IN idPelicula INT)
BEGIN
	SELECT Personajes.* From Personajes,Peliculas_Personajes
		WHERE Peliculas_personajes.Id_Pelicula=idPelicula
          And Peliculas_personajes.Id_Personaje=Personajes.Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27  9:25:31
