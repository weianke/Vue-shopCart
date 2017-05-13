var vm = new Vue({
    el: "#app",                 //控制的范围
    data: {                     //model: 模型，反向操作DOM
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    filters: {
        formatMoney: function (value) {
            return "¥ " + value.toFixed(2);
        }
    },
    mounted: function () {                   //实例化创建之后触发的
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {                  //所有事件的绑定都在methods
        cartView: function () {
            var _this = this;
            this.$http.get("data/data.json", {"id": 123}).then(function (res) {
                // console.log(res)
                _this.productList = res.body.result.list;
                // _this.totalMoney = res.body.result.totalMoney;
            });
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }

            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                // Vue.set(item,'checked',true);               //给对象item,全局注册check属性
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function () {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;

            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    // Vue.set(item,'checked',true);
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;

                }
            })
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf( this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
});

Vue.filter("money", function (value, type) {
    return "¥ " + value.toFixed(2) + type;
})

