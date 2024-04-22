# concurrency

This pattern demonstrates how to handle concurrency using AWS Step Function and/or Lambda and DynamoDB.

For the pure lambda version, it proposes a simple DynamoDB based locking mechanism to handle concurrency. Check the concurrency.ts file for the implementation.

For the Step Function version, it uses a separate step function that calls DynamoDB directly. It follows the pattern as seen [here](https://aws.amazon.com/blogs/compute/controlling-concurrency-in-distributed-systems-using-aws-step-functions/)

## How to Use It

For the pure lambda version, you have to create the table with the schema described in the concurrency.ts and you can use the lock.ts to test the locking mechanism.
Use the unlock.ts to release the lock.

In practice you would use the unlock function in the finally block of your lambda function to make sure upon success or failure the lock is released.