<template>
    <div class="my-5">
        <h1>Quizbuilder</h1>
        <div class="d-flex justify-content-center">
            <ul class="quizBuilder navbar-nav">
                <li class="nav-item">
                    <router-link :to="{name: 'QuizBuilder'}" class="nav-link">Create quiz</router-link>
                </li>
            </ul>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'QuizOverview'
}
</script>

<style>
.quizBuilder .nav-item .nav-link {
    color: #1d1d1d !important;
    font-size: 20px;
    font-weight: 600;
}

.quizBuilder .nav-item:hover .nav-link:hover {
    color: #a2a2a2 !important;
}

.quizBuilder .active {
    border-bottom: 2px solid #000000;
}
</style>
