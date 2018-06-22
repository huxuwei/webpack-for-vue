<template>
    <div>
        <p class="scss">
            <span>sdfsdfd11111</span>
        </p>
        <img src="../assets/images/1.png" alt="">
        <img src="../assets/images/2.png" alt="">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';
// $menuHover: #FFDD4F;
.scss{
    span{
        color: $redHover
    }
    transform: translateX(20px);
    border: 1px solid #333;
    border-radius: 10px;
    &::placeholder {
        color: gray;
    }
}

</style>

