var vm = new Vue({
    el: "#app",                 //控制的范围
    data: {                     //model: 模型，反向操作DOM
        title: 'hello Vue'
    },
    filters: {

    },
    mounted: function() {                   //实例化创建之后触发的
        this.cartView();
    },
    methods: {                  //所有事件的绑定都在methods
        cartView: function () {
            this.title = "Vue helasdsalp";
        }
    }
});

