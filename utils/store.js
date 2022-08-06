export default {
    encrypt( key ) {
        return "prefix_" + key;
    },

    rawGet( key ) {
        return JSON.parse( localStorage.getItem( this.encrypt(key) ) );
    },

    get( key, defaultValue=null ) {
        try {
            return this.rawGet(key) || defaultValue;
        } catch( e ) {
            return defaultValue;
        }
    },

    set( key, val )  {
        localStorage.setItem(
            this.encrypt(key),
            JSON.stringify(val)
        );
    },
    remove( key ) {
        localStorage.removeItem( this.encrypt(key) );
    }
}