/**
 * @file
 */

require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3']
});

const amazon = require('amazon-product-api');
const koa = require('koa');
const router = require('koa-router')();

const app = koa();

const client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
  awsTag: process.env.AWS_TAG,
});

app.use(router.routes());

/**
 * For instance...
 * Go to http://localhost:3000/B00CIYM0RM
 * and stuff will be printed out on screen.
 */
router.get('/:itemId', function* (){
  try {
    const data = yield client.itemLookup({
      itemId: this.params.itemId,
    });
    this.body = JSON.stringify(data);
  }
  catch (e) {
    console.log(e);
    this.body = JSON.stringify(e);
  }
});

app.listen(3000);
