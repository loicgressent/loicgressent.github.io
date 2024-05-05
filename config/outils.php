<?php
	function nettoyage($liaison,$texte)
	{
		return trim(htmlentities(mysqli_real_escape_string($liaison,$texte)));
	}
?>