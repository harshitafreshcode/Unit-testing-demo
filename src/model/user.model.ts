import { AppDataSource } from "../config/db";
import { hashPassword } from "../config/utilies";
import { User } from "../entities/user.entity";

export async function addUser(where: any, data: any, callback: any) {
    try {
        // let { email } = where
        const userRepository = AppDataSource.getRepository(User);

        const res = JSON.parse(JSON.stringify(data));

        const hash_password = await hashPassword(res.password)
        res.password = hash_password

        //......... If you want to store in memory not in db then it is used
        // const user = userRepository.create(res);
        // console.log(user, 'user');
        // callback('', user)

        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values(res)
        //     .returning('*')
        //     .execute()
        //     .then((result) => {
        //         // console.log(result, 'result');
        //         callback('', result.raw[0])
        //     }).catch((err) => {
        //         callback(err, '')
        //     });
        
        let user = await AppDataSource.manager.save(User, res)
        console.log(user, 'user');
        callback('', user)

        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values(res)
        //     // .orUpdate(["email"])
        //     .execute()
        //     .then((result) => {
        //         callback('', result)
        //     }).catch((err) => {
        //         callback(err, '')

        //     });
    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}

export async function updateUser(where: any, data: any, callback: any) {
    try {
        // let { email } = where
        const userRepository = AppDataSource.getRepository(User);

        const res = JSON.parse(JSON.stringify(data));
        console.log(res.role_id);

        if (res.password) {
            const hash_password = await hashPassword(res.password)
            console.log(hash_password, 'hash_password');
            res.password = hash_password
        }
        console.log(res, 'res');
        await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set(res)
            .where('id =:id', { id: where.id })
            .execute()
            .then((result) => {
                console.log(result);
                callback('', result)
            }).catch((err) => {
                console.log(err, 'err');
                callback(err, '')
            });

    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}

export async function FindAllUser(where: any, callback: any) {
    try {
        const userId = 1;
        
        const userRepository = AppDataSource.getRepository(User);
        console.log('********************');
        
        const [usersList, count] = await userRepository
        .createQueryBuilder('user')
        // .innerJoin('user.module', 'module')
        // .innerJoin('module.modulePermissions', 'modulePermission')
            // .innerJoin('modulePermission.permission', 'permission')
            // .innerJoin('permission.roles', 'role')
            // .innerJoin('role.users', 'user')
            // .where('user.id = :userId', { userId })
            .getManyAndCount();
            console.log('+++++++++++++');
            return callback('', usersList, count)
            
        } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}

export async function deleteUser(where: any, callback: any) {
    try {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :userId', { userId: where.id })
            .execute()
            .then((result) => {
                callback('', result)
            }).catch((err) => {
                callback(err, '')
            });

    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}

