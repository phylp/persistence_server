var chaiHttp = require('chai-http');
var chai = require('chai');
var expect = chai.expect;
var http = require('http');
var fs = require('fs');
chai.use(chaiHttp);
require('../server.js');

describe('server', function(done){
  var response;
  var error;
  before(function(done){
    chai.request('localhost:3002')
    .get('/')
    .end(function(err, res){
      error = err;
      response = res;
      done();
    });
  });
  it('should tell me the method of the request', function(){
    expect(response.text).to.eql('you made a get request');
  });
});

describe('server-post', function(done){
  var oldDir = fs.readdirSync(__dirname + '/../json_logs').length;  
  before(function(done){
    chai.request('localhost:3002')
    .post('/upload')
    .send('{"name":"charles"}')
    .end(function(err, res){
    done();
    });
  });
  it('should create a new file', function(){
    var newDir = fs.readdirSync(__dirname + '/../json_logs').length;
    expect(oldDir).to.not.eql(newDir);
  }); 
});