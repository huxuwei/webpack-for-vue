<template>
    <div id="app">
        {{a}}
        <button @click="fn"> 使用es6</button>
        <a-index></a-index>
    </div>
</template>

<script>
import aIndex from './views/a'
export default {
    name: 'app',
    data () {
        return {
            a: 'webpack-vue',
            b:{
                q:1,
                w:2,
                e:3
            }
        }
    },
    components:{
        aIndex
    },
    methods:{
        fn(){
            let b = {
                q:1,
                w:2,
                e:3,
                asdf:'asdf'
            }
            let {q,w,e} = b
            console.log(q,w,e)
        }
    }
}
</script>

<style >
 div{
     color: green;
     border: 1px solid #333;
     border-radius: 50px;
     user-select: none;
      background: linear-gradient(to bottom, white, black);
 }
</style>
