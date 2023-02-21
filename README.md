# Solutie-informatica-pentru-orientarea-profesionala-a-absolventilor-de-liceu
## Tehnologii folosite
• În realizarea aplicației am folosit React.js pe partea de frontend, respectiv Node.js (Express.js ca și framework) pe partea de backend. <br/>
• Pentru stilizare am folosit atât CSS, dar și Bootstrap (framework de CSS) și React-Bootstrap care pune la dispoziție diverse componente predefinite care înlocuiesc clasicele tag-uri din HTML. <br/>
• Pentru construirea bazei de date am folosit atât o bază de date NoSql (Firebase), dar și una sql (MySql). Firebase a fost folosit pentru realizarea părții de autentificare (stocarea utilizatorilor, criptarea parolelor), pentru reținea fotografiilor de profil ale utilizatorilor și pentru stocarea camerelor de chat cu mesajele aferente acestora. Celelalte tabele din baza de date au fost construite utilizând MySql. De asemenea, pentru a fi mai ușoară trecerea de la un tip de bază de date la alta (inițial am utilizat SQLite, iar mai apoi am trecut la MySql pentru că Heroku nu acceptă SQLite ca și bază de date) am folosit un instrument ORM (Sequelize). <br/>
### Schema bazei de date
![image](https://user-images.githubusercontent.com/74931542/196028572-2d49016e-440e-48a7-9546-26a9fefcc4dc.png) <br/>
## Descrierea aplicației
• Aplicația este destinată elevilor de clasa a 12-a pentru a avea o imagine mai clară asupra opțiunilor universitare existente în România la momentul actual. Pe platforma construită de mine utilizatorii vor găsi toate specializările de la toate facultățile, respectiv universitățile din țară care pot fi sortare și filtrate în fucție de preferințele fiecăruia, indiferent dacă persoana deține sau nu un cont pe site. <br/>
• Pentru fiecare specializare utilizatorii pot posta comentarii, însă doar dacă dețin un cont, în caz contrar pot doar vizualiza comentariile altora. <br/>
• Un avantaj al înregistrării pe platformă este acela că se poate parcurge un chestionar de orientare profesională care a fost realizat în colaborare cu doamna  Niculescu Simona Diana, psihoterapeut clinician. La finalul parcurgerii chestionarului rezultatul va fi compus din maxim 5 ramuri de studiu potrivite utilizatorului, iar pe pagina de profil va fi salvat mereu rezultatul ultimei parcurgeri a chestionarului. <br/>
• Tot pe pagina se profil este pus la dispoziție un grafic în care utilizatorul curent poate vizualiza procentul utilizatorilor care au obținut rezultate asemătoare cu ale sale. <br/>
• Pentru a nu depinde de internet, se pot descărca în format Excel specializările care fac parte din ramurile de studiu aferente rezultatului utilizatorului. <br/>
• De asemenea, există camere de chat pentru fiecare ramură de studiu din România unde utilizatorii pot conversa între ei.
## Capturi de ecran din aplicație
Aplicația este compusă din 7 pagini diferite: „Acasă”, „Creează un cont”, „Intră în cont”, pagina de profil, „Opțiuni universitare”, „Chestionar de orientare în carieră” și „Camere de chat”. De asemenea, este responsive, având un aspect plăcut și practic și pe mobil, motiv pentru care unele din următoarele imagini o să fie inserate și utilizând vizualizarea pentru mobil. <br/> <br/>
• Pe pagina „Acasă” sunt prezentate într-o componentă de tip Carousel funcționalitățile oferite de platformă pentru utilizator. <br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028801-fbbca7af-4aaf-4a0a-a7e9-9d07f954bd53.png)
<br/><br/>
• În pagina de creare a contului utilizatorul poate crea un cont în mod clasic, prin introducerea datelor solicitate sau se poate autentifica folosind un cont Google. Pentru autentificarea unui utilizator existent sunt solicitate doar emailul și parola, sau, de asemenea, se poate autentifica folosind Google.<br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028826-ce3b5224-0721-4da0-9c77-9d11d463fa57.png) <br/><br/>
• În cazul în care utilizatorul uită parola aferentă contului său, poate accesa opțiunea „Forgot password?”, iar în formularul generat dacă introduce adresa de email, i se va genera un email cu un link de resetare a parolei. <br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028905-c7de20ff-040d-4cf5-a765-fb9f190be6cb.png)
<br/><br/>
• În pagina de profil utilizatorul își poate actualiza datele personale (nume, prenume, email, username, parolă) sau poza de profil. Există opțiunea de ștergere cont în cazul în care o persoană nu mai dorește să facă parte din comunitatea platformei, iar pentru a evita atingerile accidentale ale acestui buton, se deschide o fereastră modală de confirmare a acțiunii de ștergere a contului. <br/>
• Dacă utilizatorul este autentificat în cont, atunci antetul, pe lângă tab-urile „Acasă”, „Opțiuni universitare”, „Chestionar de orientare în carieră” și „Camere de chat”, care sunt prezente și în cazul în care nu este activ un cont, este populat și cu emailul utilizatorului curent, care de fapt este un link către pagina de profil, poza de profil a lui și opțiunea de deconectare. <br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028942-a7057bcc-21de-4408-9c98-a4481feef3a4.png)
<br/><br/>
• De asemenea, poate vizualiza rezultatele ultimei parcurgeri a chestionarului prin apăsarea butonului „Rezultate chestionar”, adică topul ramurilor de studii care i se potrivesc. <br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028952-f7376aea-0b72-4dab-80bd-1f459251df3a.png)
<br/><br/>
• Pe pagina de rapoarte există un grafic cu bare unde fiecare bară reprezintă fiecare rezultat generat la chetionarul de orientare profesională și procentul utilizatorilor înscriși pe site care au obținut aceeași ramură printre ramurile din rezultatul său generat la finalul quiz-ului. <br/>
Se pot descărca într-un fișier excel specializările din țară care fac parte din ramurile din rezultatul utilizatorului, fiecare ramură fiind pe câte o foaie separată. <br/><br/>
![image](https://user-images.githubusercontent.com/74931542/196028986-97428ca9-2419-4b44-aa0a-74c9cedd6668.png)
![image](https://user-images.githubusercontent.com/74931542/196029037-e1f20f92-d87e-42ab-892b-73c5528f70bb.png)

