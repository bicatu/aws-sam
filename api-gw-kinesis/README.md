# api-gw-kinesis

This project demonstrates how to integrate API Gateway directly to Kinesis. The API Gateway is configured to accept POST requests and forward the payload to a Kinesis Stream.

Use the sam deploy command to deploy the stack. The command will package the code, upload it to S3, and create the CloudFormation stack.

It will output the API Gateway endpoint URL. Use this URL to send POST requests to the API Gateway.

# When to Use It

This is useful when you need to provide an endpoint that just receives the data and forwards it to a Kinesis Stream for async processing without having to write any code.

You should consider this only if the payload can be bigger than 256 KB (and smaller than 1 MB). If the payload is smaller than 256 KB prefer the Api Gateway to SQS integration. It is cheaper and faster.
