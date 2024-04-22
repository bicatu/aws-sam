# concurrency

This pattern demonstrates how to handle concurrency using AWS Step Function and/or Lambda and DynamoDB.

For the pure lambda version, it proposes a simple DynamoDB based locking mechanism to handle concurrency. Check the concurrency.ts file for the implementation.

For the Step Function version, it uses a separate step function that calls DynamoDB directly. It follows the pattern as seen [here](https://aws.amazon.com/blogs/compute/controlling-concurrency-in-distributed-systems-using-aws-step-functions/)