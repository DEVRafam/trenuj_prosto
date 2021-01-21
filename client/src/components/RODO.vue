<template>
    <section id="rodo">
        <h1>
            Klauzula informacyjna – art. 13 RODO – Informacja podawana w przypadku zbierania danych osobowych od osoby której dane dotyczą.
        </h1>
        <p class="explanation">
            Klauzula informacyjna – art. 13 RODO – Informacja podawana w przypadku zbierania danych osobowych od osoby której dane dotyczą. Zgodnie z art. 13 ust. ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. (RODO) informuje, iż:
        </p>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <span class="index" v-text="index + 1"></span>
                <p v-text="item"></p>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    data() {
        return {
            list: [
                "Administratorem danych osobowych jest Kamil Kuzia jako przedsiębiorca prowadzący działalność gospodarczą pod firmą: Kamil Kuzia, ul. 12 Pułku Piechoty 48, 34-100 Wadowice, wpisanym do Centralnej Ewidencji i Informacji o Działalności Gospodarczej, NIP 5512210453, REGON 380934745, www.trenujprosto.pl, Tel. 518556603, a także Arkadiusz Owczarczyk jako przedsiębiorca prowadzący działalność gospodarczą pod firmą: Arkadiusz Owczarczyk, ul. Dożynkowa 105/2, 31-234 Kraków, wpisanym do Centralnej Ewidencji i Informacji o Działalności Gospodarczej, NIP 9452217582, REGON 369477934, www.trenujprosto.pl, Tel. 533750701 zwanym dalej „ADO”.",
                "Dane osobowe przetwarzane będą w celu realizacji zadań Administratora wynikających z prowadzenia działalności gospodarczej, przy czym: prawnie uzasadnionym interesem realizowanym przez ADO jest obowiązek wynikający z art. 6 ust 1 lit. c) RODO. Dane rodziców (opiekunów prawnych) będą przetwarzane w celu realizacji (wykonywania) umowy i prawnych obowiązków z niej wynikających. Dane dzieci (ich wizerunek) będzie przetwarzany w celach i działaniach marketingowych związanych z prowadzeniem strony internetowej, profilu na facebook’u, drukowaniu ulotek i prospektów mających na uwadze promowanie ćwiczeń, zdrowego stylu życia oraz własnej działalności gospodarczej.",
                "Dane przetwarzane będą w zakresie: wizerunku dziecka podczas ćwiczeń wynikających z tytułu realizacji umowy. W przypadku rodzica (opiekuna prawnego) przetwarzane będą dane takie jak: imiona, nazwiska, daty urodzenia, nr PESEL, adres zamieszkania w celu zawarcia pisemnej umowy na wykonywanie usługi",
                "Dane osobowe nie będą przekazywane do państw trzecich na podstawie umów międzynarodowych.",
                "Dane osobowe rodziców będą przechowywane do czasu przedawnienia się roszczeń wynikających z tych umów. Dane dziecka (jego wizerunek) przechowywany będzie do czasu złożenia przez rodzica lub opiekuna prawnego pisma z prośbą o usunięcie tych danych.",
                "Przysługuje Pani/Panu prawo dostępu do swoich danych osobowych, prawo do żądania poprawienia danych, ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania danych, wykreślenia danych a także przenoszenia danych",
                "Ma Pan/Pani prawo wniesienia skargi do organu nadzoru (Prezesa Urzędu Ochrony Danych Osobowych), gdy uzna Pani/Pan, iż przetwarzanie danych osobowych Pani/Pana dotyczących narusza przepisy RODO.",
                "Podanie przez Pana/Panią danych osobowych jest dobrowolne lecz bez ich podania nie będzie możliwe zawarcie umowy na wykonywanie usługi, a w przypadku dziecka nie będzie możliwe należyte wykonywanie usługi.",
                "Pani/Pana dane nie będą przetwarzane w sposób zautomatyzowany i nie podlegają profilowaniu."
            ]
        };
    }
};
</script>
