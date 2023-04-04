# Delegate-call attack

consider a situation： TargetContract is a intermediate contract to maintain the ThirdContract.
That means if the owner want to update ThirdContract, he can still call the TargetContract,
after midify the state variable of ThirdContract's address.
Attacker found use attack method:
1. reset ThirdContract's address in TargetContract.
2. reset owner's address in TargetContract. 

Try running some of the following tasks:

```shell

```
