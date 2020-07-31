var app = new Vue({
    
    el: '#app',

    props: {

        // is the api loading
        apiLoading: {
            type: Boolean,
            default: true
        },

        // did the api error
        apiErrored: {
            type: Boolean,
            default: false
        },

        // set how we want it sorted on load
        sortId: {
            type: String,
            default: 'last_name'
        },

        // boolean for ascending or descending sort order
        sortOrder: {
            type: Boolean,
            default: false
        },

        // check if grid view
        isGrid: {
            type: Boolean,
            default: true
        }
    },
    
    data: {
        //h1 content
        message: 'Direct Supply People from API',
        btnViewText: "List View",

        //empty array for api
        persons: [],
    },

    mounted () {

        axios
            // get api
            .get('https://code-test-direct-supply.pantheonsite.io/wp-json/code-test/people')

            // get response and populate array
            .then(response => {
                this.persons = response.data.people
            })

            // catch errors
            .catch(error => {
                console.log(error)  
                this.apiErrored = true
            })

            // if no errors, turn off loading
            .finally(() => this.apiLoading = false)
    },

    computed: {

        //return an array sorted by last_name on load
        sortedPersons: function() { 

            switch(this.sortId) {
                case 'first_name':
                    return _.orderBy(this.persons, 'first_name', this.sortOrder ? 'desc' : 'asc');

                case 'last_name':
                    return _.orderBy(this.persons, 'last_name', this.sortOrder ? 'desc' : 'asc');

                default:
                    return this.persons;
            }
        }
    },

    methods: {

        // set the sort filter
        setSort(sortId) {    
            if(this.sortId === sortId) {
                return
            } else {
                this.sortId = sortId;
            }
        },

        // filter on sortId passed in
        toggleSort(sortId) {    
            if(this.sortId === sortId) {
                this.toggleOrder();
            } else {
                this.sortId = sortId;
            }
        },

        // check sortOrder, set opposite
        toggleOrder() {
            this.sortOrder = !this.sortOrder;
        },

        // set grid or list
        setView() {

            this.isGrid = !this.isGrid;

            if (this.isGrid == true) {
                this.btnViewText = "List View";
            } else {
                this.btnViewText = "Grid View";
            }
            
        }
    }
})
