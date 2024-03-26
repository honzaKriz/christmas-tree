Přepisuju generické Next.js README na "programátorský deník".

## Úvahy o řešení a původní návrh

- na úplném začátku, po prvním přečtení zadání, jsem měl nápad na vytvoření gridu, a vykreslování stromku pomocí souřadnic ve "vícerozměrném" poli
- nápad jsem ale zavrhl, a začal uvažovat o každém řádku jako stringu s "new line" znakem
- poté jsem přemýšlel o tom, kde program spouštět - chvíli jsem přemýšlel o node.js aplikaci, která by běžela v terminálu, ale v node.js nejsem zběhlý, což na jednu stranu znamenalo že bych se při práci na úkolu něco naučil, na tu druhou by to zabralo nepoměrně více času; napadlo mě na malou chvíli, že bych stromeček zobrazil v konzoli prohlížeče, pak jsem si ale řekl, že jako primárně frontend vývojář stromeček vyrenderuji v prohlížeči, a budu moct projekt i nasadit na produkční web
- v sobotu večer jsem proto založil repozitář, vytvořil Next.js boilerplate na Vercelu a rovnou stránku nasadil na server

## Postup řešení

- nebudu lhát, první co jsem zkusil bylo vygooglit zadání :D pokud bych ho našel i s řešením, nechal bych si ho jako zálohu pro případ že bych se zasekl nebo nedokázal s úkolem vůbec pohnout, chtěl jsem ale úkol řešit sám, protože se stejně snažím dělat pravidelně codewars kata, a nepřipravil bych se o možnost tréninku
- přesné zadání jsem nenašel (což cením, asi bych byl trochu zklamaný kdybych zjistil že jste ho vzali z první stránky výsledků na googlu :D ), při projíždění výsledků jsem se ale nechal inspirovat s řešením centrování stromečku, kde jsem se rozhodl pomoct si CSSkem
- když jsem začal se samotným programováním, chtěl jsem vidět na obrazovce nějaký progres co nejdřív; přemýšlel jsem o tom, že první patro má se špičkou stejný počet řádků jako patro druhé, že bych loop začínal od druhého řádku, ale potom mě napadlo že by loop mohl začínat až od druhého patra, a to první si vytvořím manuálně, díky tomu jsem měl příležitost napsat první řádek patternu s mezerami, asteriskem, a new linem, a dostal jsem konkrétnější představu o podobě výsledku jako stringu; taky jsem mohl vyzkoušet jestli bude fungovat centrování pomocí CSS
- potěšen vyrenderovaným prvním patrem jsem manuálně přidal druhé, jen abych viděl že stromeček roste (v té době jsem přemýšlel, že stromeček s jedním patrem by nebyl stromeček, a že dvě patra budou minimum, to jsem ale zavrhl), nicméně už jsem věděl že bude čas pustit se do loopu
- logiku jsem v téhle chvíli psal do souboru page.tsx, říkal jsem si že není potřeba pro účely úkolu vytvářet komponenty nebo projekt nějak více strukturovat
- pak jsem vymýšlel logiku loopu, trochu se v ní motal, a chvíli jsem jel metodu "pokud-omyl", než jsem se zastavil a s tužkou a papírem promyslel, co chci vlastně renderovat
- protože jsem link na web sdílel kamarádce, aby mohla "sledovat jak to roste", začal jsem implementovat user input, ačkoliv stromeček ještě neměl kmen; použil jsem React state na ukládání počtu pater, a conditional render, který zobrazí buďto input field, nebo stromeček
- opět s myšlenkou na uživatele jsem prokrastinoval přidáním tlačítka "zpět" a stylováním input kroku, na což jsem se rozhodl použít Tailwind - jsem zvyklý psát vlastní styly v CSS nebo LESS/SASS preprocesorech, nicméně Tailwind zkouším na svých projektech, a přicházím mu na chuť
- přidal jsem kmen, ale zatím byl příliš tlustý - poslední patro nadále pokračovalo v loopu přidáním jednoho asterisku, a kmen vyplňoval celou šířku mezery mezi větvemi, ale jak se blížila půlnoc, chtěl jsem mít alespoň tohle
- přečetl jsem znovu zadání, byl čas ošetřit možnosti na vstupu, přidal jsem validační error messages které jsem už nechtěl stylovat, tak jsem je zobrazil jako alerty; kamarádka se ptala, kolik je maximum pater, tak jsem přidal i arbitrární limit
- v zadání bylo, že by se měla krom stromku zobrazit i informace o tom, co se zobrazuje, tak jsem přidal heading který zobrazí zadaný počet pater
- pro zábavu jsem přidal hvězdičku na vrchol stromku, a přidal barvy než jsem šel spát
- další den večer, více unaven, jsem opravil šířku kmene - pokud je počet pater sudý, krajní hvězdičky na posledním patře nelícují s diagonálou, přidal jsem proto jednu hvězdičku na každou stranu stromku, vypadalo to líp než alternativa bez těchto dvou extra hvězdiček
- s tužkou a papírem jsem vymyslel, jak zobrazit řetěz, a rovnou přidal i tlačítko na toggling (což se možná trochu liší od zadání, uživatel by si mohl zvolit jestli chce řetěz nasadit při zadávání inputu o počtu pater)
- přemýšlel jsem chvíli o tom, že bych řetěz přebarvil, ale při současném řešení se stringovým patternem mě nenapadlo nic přímočarého, co by nevyžadovalo větší zásah do logiky aplikace
- začal jsem vymýšlet řešení bonusového úkolu s ozdobami, ale mozek už si říkal o spánek, takže ozdoby zatím na stromku nevisí

## Backlog

- vývojářská dokumentace
- ozdoby
- a11y
- barva řetězu
- blikání řetězu

## Připomínky k zadání

- vzhledem k tomu, že v zadání píšete o připomínkách, které mám zapsat do finální podoby, bral jsem to tak, že v rámci experimentálních podmínek úkolu se nemám doptávat na nejasnosti, ale se zadáním si poradit tak jak je, použít kreativní řešení, a nejasnosti zmínit na tomhle místě
- "Poslední patro bude vždy zuženo na velikost počtu pater stromečku" - tahle formulace mě trochu zmátla, myslím že i z toho důvodu jsem nejdříve implementoval tlustý kmen, protože jsem přesně nechápal, co je v zadání; nakonec jsem zúžil mezeru v posledním patře, ne poslední patro jako takové
- jak jsem zmiňoval v postupu řešení, u řetězu je formulace "Program se zeptá uživatele, jestli chce strom ozdobit vánočním řetězem." - "zeptá se" je trochu vágní, implementoval jsem uživatelovu možnost nasadit/sundat řetěz pomocí tlačítka
- "Pokud budete mít chuť program ještě nějak vylepšit (dynamická velikost pater, ohnuté větve, naklonění stromu) směle do toho." - tohle je nebezpečná věta, vylepšovat se dá téměř neomezeně :D
