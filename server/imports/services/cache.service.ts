import * as NodeCache from 'node-cache';



export class Cache {

  private cache;
  private ttlSeconds: number;

  constructor( ttlSeconds ) {
    this.ttlSeconds = ttlSeconds | 60;

    this.cache = new NodeCache( {
      stdTTL: this.ttlSeconds,
      checkperiod: this.ttlSeconds * 0.2,
      useClones: false
    } );
  }

  get( key: string | number ) {
    return this.cache.get( key );
  }

  getStore( key, storeFunction ) {
    const value = this.cache.get( key );
    if ( value ) {
      return Promise.resolve( value );
    }

    return storeFunction().then( ( result ) => {
      this.cache.set( key, result );
      return result;
    } );
  }

  set( key, value ): void {
    this.cache.set( key, value );
  }

  del( keys ) {
    this.cache.del( keys );
  }


  flush() {
    this.cache.flushAll();
  }
}
