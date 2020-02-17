![Image of Background](https://github.com/SaschaK13/prima_2d_platformer/blob/master/Game/Assets/menu/Curse_of_the_dawn_title_image.png)
[Spiele jetzt: "Curse of the Dawn" - schaffst du es den bösen Zauberer zu besiegen und wieder Licht in die Dunkelheit zu bringen?](https://saschak13.github.io/prima_2d_platformer/Game/index)

Um das beste Spielerlebnis zu bekommen empfehlen wir die Nutzung von **Google Chrome** als Browser.

## Inhalt: 
[Code](https://github.com/SaschaK13/prima_2d_platformer/tree/master/Game)</br>
[Designdokument](https://github.com/SaschaK13/prima_2d_platformer/tree/master/DesignDocument)</br> 
[Anleitung](#anleitung)</br>
[Known Issues](#known-issues)</br>
[Credits](#credits)</br>


## Checkliste für Leistungsnachweis

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 |Curse of the Dawn
|    | Name                  |Christian Capa, Jonas Kern und Sascha Könninger
|    | Matrikelnummer        |257670, 257896 und 257120
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation interagieren: er kann auf den Play-Button im Startscreen drücken um in das Hauptmenü des Spiels zu gelangen. Danach hat er fünf Auswahlmöglichkeiten: New Game, Load Game, Story, Settings und Controls. In den Controls sieht er die Steuerung, also welche Taste was macht. Im Story Tab kann man sich bei Interesse die kleine Hintergrundgeschichte des Spiels durchlesen. In den Einstellungen (Settings) hat er die Möglichkeit die Soundeffekte und die Musik leiser und lauter zu stellen. Mit New Game startet man ein neues Spiel. Im Spiel selber kann der Nutzer sich nach rechts und links bewegen, springen und angreifen. Dies wird mithilfe von KeyBoard Events umgesetzt. Es werden lediglich 5 Tasten benötigt: A und D zum Laufen, SPACE zum Springen, E um einen Angriff auszuführen und ESC um das Menü im Spiel aufzurufen. In diesem Menü kann man das Spiel neustarten, zum Hauptmenü zurückkehren und sich ggf. nochmal die Steuerung anschauen. Schafft man es ans Ende eines Levels hat man die Möglichkeit zu speichern oder ins nächste Level zu gehen. Sollte der Spieler nun sterben kann er entweder von vorne anfangen (Restart) oder Zurück zum Menü gehen. Im Menü kann man (nachdem man gespeichert hat) nun auch die letzte Option (Load Game) nutzen und einen gespeicherten Spielstand laden.                                                                                                           |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Grundlegend reagiert unser Charakter auf jegliche Kollisionen, mit den im Spiel eingebunden Objekten: Jeder Charakter ist mit einem Collider ausgestattet, der bei jedem Update prüft ob man mit etwas kollidiert. Auf Plattformen kann der Spieler (und auch die Gegner) stehen. Bei einer Kollision mit Blobs (einer einfachen Gegnerform) bekommt der Spieler Schaden. Grundlegend ist jeder Charakter auch mit einer Hitbox ausgestattet. Bei ihr handelt es sich um einen weiteren Collider, der die Angriffsreichsweite des Charakters beschreibt. Greift zum Beispiel ein Spieler oder ein Goblin an, prüft die Hitbox ob sich eine Instanz eines Gegners oder ggf. eines Spielers darin befindet. Ist das der Fall, so erhält dieser Schaden. Als letzten Gegnertypen gibt es noch den Zauberer. Dieser schießt magische Geschosse, die auch den Collider benutzen, sodass der Spieler Schaden bekommt, wenn er diese berührt. Wenn der Spieler mit Items kollidiert, werden diese eingesammelt. Kollidiert der Spieler mit dem Spiegel, welcher unser Level Ende darstellt, bekommt er die Möglichkeit zu speichern oder ins nächste Level zu gehen.                                            |
|  3 | Objektanzahl variabel | Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Das beste Beispiel hierfür sind Items. Diese werden zufällig (mit einer bestimmten Dropchance) zur Laufzeit erzeugt. Die Geschosse des Zauberers werden auch zur Laufzeit erzeugt und nach einer bestimmten Lebenszeit wieder gelöscht. Wir laden zwar unsere Level über eine JSON-Datei, aus Performancegründen haben wir aber eine Funktion geschrieben, die Gegner, Hintergrund und Plattformen außerhalb des Sichtfelds löscht und diese erst wieder erzeugt und somit neu lädt wenn sie wieder ins Sichtfeld gelangen.                                                                                   |
|  4 | Szenenhierarchie      | Die Szenenhierarchie besteht grundlegend aus einer Root-Node, an der die Kamera angehangen wird und eine Collidable-Node, die sämtliche Spielinhalte, mit denen man kollidieren kann, beinhaltet. Um die verschiedenen Spielobjekte innerhalb des Codes zu unterscheiden beinhaltet unsere Level-Klasse jeweils einen Array für Spieler, Plattformen und Items, über diese wir beispielsweise bei Kollisionsabfragen iterieren. Dies hätten wir auch mit Nodes lösen können, allerdings haben wir anfänglich mit Arrays gearbeitet und wollten dies dann so beibehalten.                                                                                                                                                           |
|  5 | Sound                 | Sounds sind eingebunden und unterstützen die Wahrnehmung der Aktionen. Es gibt für jede wichtige Interaktion einen passenden Sound (Sprung, Attacke, Aufheben von Items und wenn man Schaden bekommt). Hinzu kommt entspannte Musik im Hauptmenü und verschiedene actionreiche Themes in den unterschiedlichen Levels. Zu dem erhält der Nutzer eine Response, wenn er in den verschiedenen Menüs eine Auswahlmöglichkeit anklickt.                                                                             |
|  6 | GUI                   | Wie bereits oben im Detail beschrieben, beinhalt das Spiel einige GUI-Elemente: den Startscreen, das Hauptmenü, das Menü im Spiel, den Game Over- und Next Level-Screen. Hinzu kommt, dass man während des Spiels eine Lebensanzeige in Form von Herzen hat und eine Anzeige, die dem Spieler die aktuellen Werte für Laufgeschwindigkeit, Sprunghöhe, Schaden und Angriffsgeschwindigkeit anzeigen. Diese aktualisieren sich, je nach aufgehobenem Item.                                                                |
|  7 | Externe Daten         | Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Jedes Level wird extern aus einer JSON-Datei geladen. Parameter, die man hier verändern kann sind: Länge des Levels (in unserer Einheit), Theme des Levels, Position und Scaling des Spielers, Position und Scaling sämtlicher Plattformen, Hintergrund des Levels, Ende des Levels, Gegner und Items. Wenn der Spieler sich dazu entscheidet ein Spiel zu speichern, wird dies ebenfalls in eine JSON gespeichert, welche den Namen des Levels und die die aktuellen Spielerwerte beinhaltet.                                                                          |
|  8 | Verhaltensklassen     | Die Charakterklasse beinhaltet Funktionen zur Kollisionsabfrage und -weiterverarbeitung. Des Weiteren gibt es hier Funktionen, die die Sprites und Animationen an die verschiedenen Charakterzustände anpassen. Zudem beschreibt die Charakterklasse sämtliche Bewegungsaktionen, wie Springen, Laufen, Idle, Umschauen, Angreifen, Schaden nehmen und Tod. Einige davon werden von Kindern der Charakterklasse überschrieben um das Verhalten zu spezifizieren. Alle Gegnertypen beinhalten außerdem Funktionen, die deren Verhalten innerhalb der Spielwelt beschreibt. Der Goblin schaut sich bspw. so lange in der Gegend um bis er einen Spieler auf derselben Plattform erkennt um daraufhin auf ihn zu zulaufen und ihn anzugreifen. Bei den Blobs handelt es sich um weniger intelligente Gegner, sie laufen auf ihrer Plattform nur zufällig von links nach rechts. Der Zauberer erweitert den Charakter unter anderem um die Verhaltensmethoden teleport und shoot. Nach einer gewissen Zeit teleportiert sich der Zauberer von links nach rechts in einem bestimmten Intervall und schießt nach der Teleportation magische Geschosse in Richtung des Spielers (shoot-Methode). Weitere wichtige Methoden sind in der Levelgenerator-Klasse, welche sich beim Starten des Spiels, Laden eines Spielstands oder Laden des nächsten Levels um die Initialisierung des Levels und Erstellung deren Spielobjekte kümmert. Zu guter Letzt haben wir noch eine Util Kasse. Dabei handelt es sich um einen Singleton, welcher alle für das Laufen des Spiels relevanten Infos beinhaltet, wie zum Beispiel das aktuelle Level, eine Instanz des Levelgenerators und sämtliche Sounds. Außerdem beinhaltet sie wiederverwendbare Funktionen wie beispielsweise eine Funktion, die eine zufällige Zahl innerhalb eines Wertebereichs wiedergibt.
|  9 | Subklassen            | Umgebungsobjekte des Spiels erben alle von der Environment-Klasse, welche von der fudge.Node erbt. Die Environment-Klasse stellt bereits alle wichtigen Komponenten wie die ComponentTransform, ComponentMesh, usw. bereit. Außerdem kümmert sie sich auch um das Laden der Sprites. Plattformen, Items, Finish und Background erweitern diese um spezifische Funktionen. Des Weiteren erben, wie bereits erwähnt sämtliche Gegner und der Spieler von der Charakter-Klasse und erweitern deren Funktionen. Die Charakter-Klasse erbt ebenfalls von fudge.Node. |
| 10 | Maße & Positionen     | Der Nullpunkt des Koordinatensystems befindet sich am Start, in der Mitte des Screens. Das Level erstreckt sich in positive X-Richtung und der Charakter kann sich auf der Y-Achse ca. 5 Einheiten nach oben und unten bewegen. Jedes Spielelement wird ausgehend vom Nullpunkt positioniert.                                                                |
| 11 | Event-System          | Sämtliche Tasteninteraktionen werden über einen Listener gehändelt, welcher dann, je nach gedrückter Taste die damit verbundene Funktion aufruft. Der Charakter beinhaltet einen EventListener auf die Fudge Loopframe, welche pro Frame die Sprites updatet, eine Kollision prüft, die Velocity auf den Charakter anwendet und verschiedene Cooldowns bearbeitet. Des Weiteren beinhalten die Gegner ebenfalls einen LoopFrameListener, welcher pro Frame das Verhalten des jeweiligen Gegners ausführt. Auch das animieren der Sprites wird über EventListener gehändelt. Auch bei sämtlichen UI-Interaktionselementen wird das Event-System verwendet.                                                                       |


## Known Issues:

1. Das Spiel lässt sich nicht in Firefox starten
    * Unbekannt
2. Animationen werden teils nicht richtig abgespielt
    * Unbekannt
3. Blobs laufen manchmal in Plattformen 
    * Liegt an dem laden der Blobs und der gravity
    
    
    
## Anleitung: 
Um das Spiel zu starten klicke einfach folgenden Link: [Curse of the Dawn](https://saschak13.github.io/prima_2d_platformer/Game/index)</br>
Die Steuerung wird im Menü unter: "Controls" erklärt.</br>


## Credits: 
1.  Musik
    * Menü-Theme: [8Bit Presentation - by David Fesliyan](https://www.fesliyanstudios.com/royalty-free-music/download/8-bit-presentation/383)
    * Level1-Theme: [Retro Forest - by David Fesliyan](https://www.fesliyanstudios.com/royalty-free-music/download/retro-forest/451)
    * Level2-Theme: [La Calahorra - by Rolemusic](https://freemusicarchive.org/search?sort=track_date_published&d=1&quicksearch=La+Calahorra)
    * Level3-Theme: [Juglar Street - by Rolemusic](https://freemusicarchive.org/search?sort=track_date_published&d=1&quicksearch=juglar+street)
    * Level4-Theme: [Kinetic Sands - by Azureflux](https://freemusicarchive.org/music/Azureflux/Bit_Bops/06_azureflux_-_kinetic_sands)
    
2. Code/Ideen
      * Christian Capa
      * Sascha Könninger
      * Jonas Kern

