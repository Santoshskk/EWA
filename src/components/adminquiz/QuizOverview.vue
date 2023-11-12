<template>
    <div class="my-5">
        <div>
            <h1>Quiz Overview</h1>
            <div class="d-flex justify-content-center">
                <ul class="quizBuilder navbar-nav">
                    <li class="quizOverviewCards">
                        <router-link :to="{name: 'QuizBuilder'}" class="nav-link">Quiz Builder</router-link>
                    </li>
                </ul>
            </div>
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

.quizOverviewCards {
    width: 241px;
    height: 162px;
    flex-shrink: 0;
}
</style>
