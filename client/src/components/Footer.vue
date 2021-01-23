<template>
    <footer id="main-footer">
        <!--  -->
        <div class="level">
            <!--  -->
            <div class="element phones">
                <label>Telefony kontaktowe:</label>
                <div class="numbers-wrap">
                    <span class="single-number">
                        <strong>Kamil</strong>
                        <div>518 556 603</div>
                    </span>
                    <!--  -->
                    <span class="single-number">
                        <strong>Arek</strong>
                        <div>533 750 701</div>
                    </span>
                </div>
            </div>
            <!--  -->
            <div class="wrap">
                <div class="element">
                    <label>Email:</label>
                    <strong>trenujprosto@gmail.com</strong>
                </div>
                <!--  -->
                <div class="element">
                    <a href="https://www.facebook.com/TrenujProsto" target="_blank" class="fb">Zobacz nasz facebook</a>
                </div>
                <!--  -->
                <div class="element">
                    <router-link to="/admin/login">Zaloguj</router-link>
                </div>
                <!--  -->
                <div class="element">
                    <router-link to="/rodo">RODO</router-link>
                </div>
            </div>
        </div>
        <!--  -->
        <span class="space"></span>
        <!--  -->
        <div class="level">
            Created by Łukasz Kubera and Kacper Książek
        </div>
    </footer>
</template>
