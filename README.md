# kue-examples

## Requirements

* Redis

## Producer

Producerはキューにジョブを登録します。
**create**メソッドを実行して、ジョブを登録できます。  
**delay**で処理する時間を調整、**removeOnComplete**で実行が完了したら、ジョブを削除するようにします。  
**removeOnComplete**を指定しない場合、ジョブのステータスが完了済みになるだけで、メモリ上にはジョブのデータが残ったままになリます。

```js
var kue = require('kue');
var producer = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

producer.create('example', {})
  .delay(10000)
  .removeOnComplete(true)
  .save(function (err) {
    if (err) {
      return console.error(err);
    }
    process.exit();
  });
```

## Consumer

Consumerはキューに溜まっているジョブを処理します。  
**process**メソッドを使用して、ジョブを処理するコールバック関数を登録します。  
登録した関数にには、ジョブのデータと、処理完了時にコールする関数を受け取ります。

```js
var kue = require('kue');
var consumer = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

consumer.process('example', function (job, done) {
  job.log('ok');
  console.log('ok');
  done(); //正常に終了したら、実行する
});
consumer.watchStuckJobs();
kue.app.listen(3000);
```
