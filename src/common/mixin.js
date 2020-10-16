export let bodyWidthMixin = {
    data(){
        return{
            // clientWidth: document.documentElement.clientWidth,
            bodyWidth: document.body.scrollWidth ,
        }
    },
    created(){
        window.addEventListener('resize', this.handleResize);
        // console.log(this.bodyWidth);
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize (event) {
            // this.clientWidth = document.documentElement.clientWidth;
            this.bodyWidth = document.body.scrollWidth ;
            // console.log(this.bodyWidth);
        },
    }
};