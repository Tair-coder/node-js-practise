const http = require("http");
const EventEmitter = require("events");
const Router = require("./Router");
const path = require("path");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer()
    this.middlewares = []
  }


  use(middlewares){
    this.middlewares.push(middlewares)
  }

  listen(port,callback){
      this.server.listen(port,callback)
  }
  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path,method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";
      req.on('data',(chunk)=>{
        body+= chunk
      })
      req.on('end',()=>{
        if(body){
          req.body = JSON.parse(body)
        }
        this.middlewares.forEach(middlewares => middlewares(req,res))
        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );
        if (!emitted) {
          res.end();
        }
      })
      
      // res.end(req.url)
    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
