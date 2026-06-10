
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserPlan
 * 
 */
export type UserPlan = $Result.DefaultSelection<Prisma.$UserPlanPayload>
/**
 * Model FoodCache
 * 
 */
export type FoodCache = $Result.DefaultSelection<Prisma.$FoodCachePayload>
/**
 * Model FoodLog
 * 
 */
export type FoodLog = $Result.DefaultSelection<Prisma.$FoodLogPayload>
/**
 * Model StepLog
 * 
 */
export type StepLog = $Result.DefaultSelection<Prisma.$StepLogPayload>
/**
 * Model FavoriteFood
 * 
 */
export type FavoriteFood = $Result.DefaultSelection<Prisma.$FavoriteFoodPayload>
/**
 * Model WeightLog
 * 
 */
export type WeightLog = $Result.DefaultSelection<Prisma.$WeightLogPayload>
/**
 * Model WaterLog
 * 
 */
export type WaterLog = $Result.DefaultSelection<Prisma.$WaterLogPayload>
/**
 * Model LiftLog
 * 
 */
export type LiftLog = $Result.DefaultSelection<Prisma.$LiftLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPlan`: Exposes CRUD operations for the **UserPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPlans
    * const userPlans = await prisma.userPlan.findMany()
    * ```
    */
  get userPlan(): Prisma.UserPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foodCache`: Exposes CRUD operations for the **FoodCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoodCaches
    * const foodCaches = await prisma.foodCache.findMany()
    * ```
    */
  get foodCache(): Prisma.FoodCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foodLog`: Exposes CRUD operations for the **FoodLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoodLogs
    * const foodLogs = await prisma.foodLog.findMany()
    * ```
    */
  get foodLog(): Prisma.FoodLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stepLog`: Exposes CRUD operations for the **StepLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StepLogs
    * const stepLogs = await prisma.stepLog.findMany()
    * ```
    */
  get stepLog(): Prisma.StepLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favoriteFood`: Exposes CRUD operations for the **FavoriteFood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FavoriteFoods
    * const favoriteFoods = await prisma.favoriteFood.findMany()
    * ```
    */
  get favoriteFood(): Prisma.FavoriteFoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weightLog`: Exposes CRUD operations for the **WeightLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeightLogs
    * const weightLogs = await prisma.weightLog.findMany()
    * ```
    */
  get weightLog(): Prisma.WeightLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.waterLog`: Exposes CRUD operations for the **WaterLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WaterLogs
    * const waterLogs = await prisma.waterLog.findMany()
    * ```
    */
  get waterLog(): Prisma.WaterLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liftLog`: Exposes CRUD operations for the **LiftLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiftLogs
    * const liftLogs = await prisma.liftLog.findMany()
    * ```
    */
  get liftLog(): Prisma.LiftLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserPlan: 'UserPlan',
    FoodCache: 'FoodCache',
    FoodLog: 'FoodLog',
    StepLog: 'StepLog',
    FavoriteFood: 'FavoriteFood',
    WeightLog: 'WeightLog',
    WaterLog: 'WaterLog',
    LiftLog: 'LiftLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userPlan" | "foodCache" | "foodLog" | "stepLog" | "favoriteFood" | "weightLog" | "waterLog" | "liftLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserPlan: {
        payload: Prisma.$UserPlanPayload<ExtArgs>
        fields: Prisma.UserPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          findFirst: {
            args: Prisma.UserPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          findMany: {
            args: Prisma.UserPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>[]
          }
          create: {
            args: Prisma.UserPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          createMany: {
            args: Prisma.UserPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>[]
          }
          delete: {
            args: Prisma.UserPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          update: {
            args: Prisma.UserPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          deleteMany: {
            args: Prisma.UserPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>[]
          }
          upsert: {
            args: Prisma.UserPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPlanPayload>
          }
          aggregate: {
            args: Prisma.UserPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPlan>
          }
          groupBy: {
            args: Prisma.UserPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPlanCountArgs<ExtArgs>
            result: $Utils.Optional<UserPlanCountAggregateOutputType> | number
          }
        }
      }
      FoodCache: {
        payload: Prisma.$FoodCachePayload<ExtArgs>
        fields: Prisma.FoodCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          findFirst: {
            args: Prisma.FoodCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          findMany: {
            args: Prisma.FoodCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>[]
          }
          create: {
            args: Prisma.FoodCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          createMany: {
            args: Prisma.FoodCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>[]
          }
          delete: {
            args: Prisma.FoodCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          update: {
            args: Prisma.FoodCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          deleteMany: {
            args: Prisma.FoodCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>[]
          }
          upsert: {
            args: Prisma.FoodCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodCachePayload>
          }
          aggregate: {
            args: Prisma.FoodCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoodCache>
          }
          groupBy: {
            args: Prisma.FoodCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodCacheCountArgs<ExtArgs>
            result: $Utils.Optional<FoodCacheCountAggregateOutputType> | number
          }
        }
      }
      FoodLog: {
        payload: Prisma.$FoodLogPayload<ExtArgs>
        fields: Prisma.FoodLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          findFirst: {
            args: Prisma.FoodLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          findMany: {
            args: Prisma.FoodLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>[]
          }
          create: {
            args: Prisma.FoodLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          createMany: {
            args: Prisma.FoodLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>[]
          }
          delete: {
            args: Prisma.FoodLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          update: {
            args: Prisma.FoodLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          deleteMany: {
            args: Prisma.FoodLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>[]
          }
          upsert: {
            args: Prisma.FoodLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          aggregate: {
            args: Prisma.FoodLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoodLog>
          }
          groupBy: {
            args: Prisma.FoodLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodLogCountArgs<ExtArgs>
            result: $Utils.Optional<FoodLogCountAggregateOutputType> | number
          }
        }
      }
      StepLog: {
        payload: Prisma.$StepLogPayload<ExtArgs>
        fields: Prisma.StepLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StepLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StepLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          findFirst: {
            args: Prisma.StepLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StepLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          findMany: {
            args: Prisma.StepLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>[]
          }
          create: {
            args: Prisma.StepLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          createMany: {
            args: Prisma.StepLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StepLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>[]
          }
          delete: {
            args: Prisma.StepLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          update: {
            args: Prisma.StepLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          deleteMany: {
            args: Prisma.StepLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StepLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StepLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>[]
          }
          upsert: {
            args: Prisma.StepLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepLogPayload>
          }
          aggregate: {
            args: Prisma.StepLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStepLog>
          }
          groupBy: {
            args: Prisma.StepLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<StepLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.StepLogCountArgs<ExtArgs>
            result: $Utils.Optional<StepLogCountAggregateOutputType> | number
          }
        }
      }
      FavoriteFood: {
        payload: Prisma.$FavoriteFoodPayload<ExtArgs>
        fields: Prisma.FavoriteFoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          findFirst: {
            args: Prisma.FavoriteFoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          findMany: {
            args: Prisma.FavoriteFoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>[]
          }
          create: {
            args: Prisma.FavoriteFoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          createMany: {
            args: Prisma.FavoriteFoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteFoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>[]
          }
          delete: {
            args: Prisma.FavoriteFoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          update: {
            args: Prisma.FavoriteFoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          deleteMany: {
            args: Prisma.FavoriteFoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteFoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteFoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>[]
          }
          upsert: {
            args: Prisma.FavoriteFoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteFoodPayload>
          }
          aggregate: {
            args: Prisma.FavoriteFoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavoriteFood>
          }
          groupBy: {
            args: Prisma.FavoriteFoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteFoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteFoodCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteFoodCountAggregateOutputType> | number
          }
        }
      }
      WeightLog: {
        payload: Prisma.$WeightLogPayload<ExtArgs>
        fields: Prisma.WeightLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeightLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeightLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          findFirst: {
            args: Prisma.WeightLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeightLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          findMany: {
            args: Prisma.WeightLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>[]
          }
          create: {
            args: Prisma.WeightLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          createMany: {
            args: Prisma.WeightLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeightLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>[]
          }
          delete: {
            args: Prisma.WeightLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          update: {
            args: Prisma.WeightLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          deleteMany: {
            args: Prisma.WeightLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeightLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeightLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>[]
          }
          upsert: {
            args: Prisma.WeightLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          aggregate: {
            args: Prisma.WeightLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeightLog>
          }
          groupBy: {
            args: Prisma.WeightLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeightLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeightLogCountArgs<ExtArgs>
            result: $Utils.Optional<WeightLogCountAggregateOutputType> | number
          }
        }
      }
      WaterLog: {
        payload: Prisma.$WaterLogPayload<ExtArgs>
        fields: Prisma.WaterLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WaterLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WaterLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          findFirst: {
            args: Prisma.WaterLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WaterLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          findMany: {
            args: Prisma.WaterLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>[]
          }
          create: {
            args: Prisma.WaterLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          createMany: {
            args: Prisma.WaterLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WaterLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>[]
          }
          delete: {
            args: Prisma.WaterLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          update: {
            args: Prisma.WaterLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          deleteMany: {
            args: Prisma.WaterLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WaterLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WaterLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>[]
          }
          upsert: {
            args: Prisma.WaterLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          aggregate: {
            args: Prisma.WaterLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWaterLog>
          }
          groupBy: {
            args: Prisma.WaterLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WaterLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WaterLogCountArgs<ExtArgs>
            result: $Utils.Optional<WaterLogCountAggregateOutputType> | number
          }
        }
      }
      LiftLog: {
        payload: Prisma.$LiftLogPayload<ExtArgs>
        fields: Prisma.LiftLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiftLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiftLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          findFirst: {
            args: Prisma.LiftLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiftLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          findMany: {
            args: Prisma.LiftLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>[]
          }
          create: {
            args: Prisma.LiftLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          createMany: {
            args: Prisma.LiftLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiftLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>[]
          }
          delete: {
            args: Prisma.LiftLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          update: {
            args: Prisma.LiftLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          deleteMany: {
            args: Prisma.LiftLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiftLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiftLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>[]
          }
          upsert: {
            args: Prisma.LiftLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiftLogPayload>
          }
          aggregate: {
            args: Prisma.LiftLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiftLog>
          }
          groupBy: {
            args: Prisma.LiftLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiftLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiftLogCountArgs<ExtArgs>
            result: $Utils.Optional<LiftLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userPlan?: UserPlanOmit
    foodCache?: FoodCacheOmit
    foodLog?: FoodLogOmit
    stepLog?: StepLogOmit
    favoriteFood?: FavoriteFoodOmit
    weightLog?: WeightLogOmit
    waterLog?: WaterLogOmit
    liftLog?: LiftLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    logs: number
    steps: number
    favorites: number
    weights: number
    liftLogs: number
    waters: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | UserCountOutputTypeCountLogsArgs
    steps?: boolean | UserCountOutputTypeCountStepsArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    weights?: boolean | UserCountOutputTypeCountWeightsArgs
    liftLogs?: boolean | UserCountOutputTypeCountLiftLogsArgs
    waters?: boolean | UserCountOutputTypeCountWatersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteFoodWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWeightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLiftLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiftLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    heightCm: number | null
    startingWeightKg: number | null
    age: number | null
    calGoal: number | null
    protGoal: number | null
    carbGoal: number | null
    fatGoal: number | null
    stepGoal: number | null
    weightGoal: number | null
  }

  export type UserSumAggregateOutputType = {
    heightCm: number | null
    startingWeightKg: number | null
    age: number | null
    calGoal: number | null
    protGoal: number | null
    carbGoal: number | null
    fatGoal: number | null
    stepGoal: number | null
    weightGoal: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    createdAt: Date | null
    onboardingComplete: boolean | null
    heightCm: number | null
    startingWeightKg: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    primaryGoal: string | null
    fitnessExperience: string | null
    dietaryPreference: string | null
    equipment: string | null
    calGoal: number | null
    protGoal: number | null
    carbGoal: number | null
    fatGoal: number | null
    stepGoal: number | null
    weightGoal: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    createdAt: Date | null
    onboardingComplete: boolean | null
    heightCm: number | null
    startingWeightKg: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    primaryGoal: string | null
    fitnessExperience: string | null
    dietaryPreference: string | null
    equipment: string | null
    calGoal: number | null
    protGoal: number | null
    carbGoal: number | null
    fatGoal: number | null
    stepGoal: number | null
    weightGoal: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    createdAt: number
    onboardingComplete: number
    heightCm: number
    startingWeightKg: number
    age: number
    sex: number
    activityLevel: number
    primaryGoal: number
    fitnessExperience: number
    dietaryPreference: number
    equipment: number
    calGoal: number
    protGoal: number
    carbGoal: number
    fatGoal: number
    stepGoal: number
    weightGoal: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    heightCm?: true
    startingWeightKg?: true
    age?: true
    calGoal?: true
    protGoal?: true
    carbGoal?: true
    fatGoal?: true
    stepGoal?: true
    weightGoal?: true
  }

  export type UserSumAggregateInputType = {
    heightCm?: true
    startingWeightKg?: true
    age?: true
    calGoal?: true
    protGoal?: true
    carbGoal?: true
    fatGoal?: true
    stepGoal?: true
    weightGoal?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    onboardingComplete?: true
    heightCm?: true
    startingWeightKg?: true
    age?: true
    sex?: true
    activityLevel?: true
    primaryGoal?: true
    fitnessExperience?: true
    dietaryPreference?: true
    equipment?: true
    calGoal?: true
    protGoal?: true
    carbGoal?: true
    fatGoal?: true
    stepGoal?: true
    weightGoal?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    onboardingComplete?: true
    heightCm?: true
    startingWeightKg?: true
    age?: true
    sex?: true
    activityLevel?: true
    primaryGoal?: true
    fitnessExperience?: true
    dietaryPreference?: true
    equipment?: true
    calGoal?: true
    protGoal?: true
    carbGoal?: true
    fatGoal?: true
    stepGoal?: true
    weightGoal?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    onboardingComplete?: true
    heightCm?: true
    startingWeightKg?: true
    age?: true
    sex?: true
    activityLevel?: true
    primaryGoal?: true
    fitnessExperience?: true
    dietaryPreference?: true
    equipment?: true
    calGoal?: true
    protGoal?: true
    carbGoal?: true
    fatGoal?: true
    stepGoal?: true
    weightGoal?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    createdAt: Date
    onboardingComplete: boolean
    heightCm: number | null
    startingWeightKg: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    primaryGoal: string | null
    fitnessExperience: string | null
    dietaryPreference: string | null
    equipment: string | null
    calGoal: number
    protGoal: number
    carbGoal: number
    fatGoal: number
    stepGoal: number
    weightGoal: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    onboardingComplete?: boolean
    heightCm?: boolean
    startingWeightKg?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    primaryGoal?: boolean
    fitnessExperience?: boolean
    dietaryPreference?: boolean
    equipment?: boolean
    calGoal?: boolean
    protGoal?: boolean
    carbGoal?: boolean
    fatGoal?: boolean
    stepGoal?: boolean
    weightGoal?: boolean
    logs?: boolean | User$logsArgs<ExtArgs>
    steps?: boolean | User$stepsArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    weights?: boolean | User$weightsArgs<ExtArgs>
    plan?: boolean | User$planArgs<ExtArgs>
    liftLogs?: boolean | User$liftLogsArgs<ExtArgs>
    waters?: boolean | User$watersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    onboardingComplete?: boolean
    heightCm?: boolean
    startingWeightKg?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    primaryGoal?: boolean
    fitnessExperience?: boolean
    dietaryPreference?: boolean
    equipment?: boolean
    calGoal?: boolean
    protGoal?: boolean
    carbGoal?: boolean
    fatGoal?: boolean
    stepGoal?: boolean
    weightGoal?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    onboardingComplete?: boolean
    heightCm?: boolean
    startingWeightKg?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    primaryGoal?: boolean
    fitnessExperience?: boolean
    dietaryPreference?: boolean
    equipment?: boolean
    calGoal?: boolean
    protGoal?: boolean
    carbGoal?: boolean
    fatGoal?: boolean
    stepGoal?: boolean
    weightGoal?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    onboardingComplete?: boolean
    heightCm?: boolean
    startingWeightKg?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    primaryGoal?: boolean
    fitnessExperience?: boolean
    dietaryPreference?: boolean
    equipment?: boolean
    calGoal?: boolean
    protGoal?: boolean
    carbGoal?: boolean
    fatGoal?: boolean
    stepGoal?: boolean
    weightGoal?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "createdAt" | "onboardingComplete" | "heightCm" | "startingWeightKg" | "age" | "sex" | "activityLevel" | "primaryGoal" | "fitnessExperience" | "dietaryPreference" | "equipment" | "calGoal" | "protGoal" | "carbGoal" | "fatGoal" | "stepGoal" | "weightGoal", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | User$logsArgs<ExtArgs>
    steps?: boolean | User$stepsArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    weights?: boolean | User$weightsArgs<ExtArgs>
    plan?: boolean | User$planArgs<ExtArgs>
    liftLogs?: boolean | User$liftLogsArgs<ExtArgs>
    waters?: boolean | User$watersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      logs: Prisma.$FoodLogPayload<ExtArgs>[]
      steps: Prisma.$StepLogPayload<ExtArgs>[]
      favorites: Prisma.$FavoriteFoodPayload<ExtArgs>[]
      weights: Prisma.$WeightLogPayload<ExtArgs>[]
      plan: Prisma.$UserPlanPayload<ExtArgs> | null
      liftLogs: Prisma.$LiftLogPayload<ExtArgs>[]
      waters: Prisma.$WaterLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      createdAt: Date
      onboardingComplete: boolean
      heightCm: number | null
      startingWeightKg: number | null
      age: number | null
      sex: string | null
      activityLevel: string | null
      primaryGoal: string | null
      fitnessExperience: string | null
      dietaryPreference: string | null
      equipment: string | null
      calGoal: number
      protGoal: number
      carbGoal: number
      fatGoal: number
      stepGoal: number
      weightGoal: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends User$logsArgs<ExtArgs> = {}>(args?: Subset<T, User$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    steps<T extends User$stepsArgs<ExtArgs> = {}>(args?: Subset<T, User$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weights<T extends User$weightsArgs<ExtArgs> = {}>(args?: Subset<T, User$weightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    plan<T extends User$planArgs<ExtArgs> = {}>(args?: Subset<T, User$planArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    liftLogs<T extends User$liftLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$liftLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    waters<T extends User$watersArgs<ExtArgs> = {}>(args?: Subset<T, User$watersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly onboardingComplete: FieldRef<"User", 'Boolean'>
    readonly heightCm: FieldRef<"User", 'Float'>
    readonly startingWeightKg: FieldRef<"User", 'Float'>
    readonly age: FieldRef<"User", 'Int'>
    readonly sex: FieldRef<"User", 'String'>
    readonly activityLevel: FieldRef<"User", 'String'>
    readonly primaryGoal: FieldRef<"User", 'String'>
    readonly fitnessExperience: FieldRef<"User", 'String'>
    readonly dietaryPreference: FieldRef<"User", 'String'>
    readonly equipment: FieldRef<"User", 'String'>
    readonly calGoal: FieldRef<"User", 'Int'>
    readonly protGoal: FieldRef<"User", 'Int'>
    readonly carbGoal: FieldRef<"User", 'Int'>
    readonly fatGoal: FieldRef<"User", 'Int'>
    readonly stepGoal: FieldRef<"User", 'Int'>
    readonly weightGoal: FieldRef<"User", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.logs
   */
  export type User$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    cursor?: FoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * User.steps
   */
  export type User$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    where?: StepLogWhereInput
    orderBy?: StepLogOrderByWithRelationInput | StepLogOrderByWithRelationInput[]
    cursor?: StepLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StepLogScalarFieldEnum | StepLogScalarFieldEnum[]
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    where?: FavoriteFoodWhereInput
    orderBy?: FavoriteFoodOrderByWithRelationInput | FavoriteFoodOrderByWithRelationInput[]
    cursor?: FavoriteFoodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteFoodScalarFieldEnum | FavoriteFoodScalarFieldEnum[]
  }

  /**
   * User.weights
   */
  export type User$weightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    where?: WeightLogWhereInput
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    cursor?: WeightLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * User.plan
   */
  export type User$planArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    where?: UserPlanWhereInput
  }

  /**
   * User.liftLogs
   */
  export type User$liftLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    where?: LiftLogWhereInput
    orderBy?: LiftLogOrderByWithRelationInput | LiftLogOrderByWithRelationInput[]
    cursor?: LiftLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiftLogScalarFieldEnum | LiftLogScalarFieldEnum[]
  }

  /**
   * User.waters
   */
  export type User$watersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    where?: WaterLogWhereInput
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    cursor?: WaterLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserPlan
   */

  export type AggregateUserPlan = {
    _count: UserPlanCountAggregateOutputType | null
    _min: UserPlanMinAggregateOutputType | null
    _max: UserPlanMaxAggregateOutputType | null
  }

  export type UserPlanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    mealPlan: string | null
    workoutPlan: string | null
    summary: string | null
    generatedAt: Date | null
    updatedAt: Date | null
  }

  export type UserPlanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    mealPlan: string | null
    workoutPlan: string | null
    summary: string | null
    generatedAt: Date | null
    updatedAt: Date | null
  }

  export type UserPlanCountAggregateOutputType = {
    id: number
    userId: number
    mealPlan: number
    workoutPlan: number
    summary: number
    generatedAt: number
    updatedAt: number
    _all: number
  }


  export type UserPlanMinAggregateInputType = {
    id?: true
    userId?: true
    mealPlan?: true
    workoutPlan?: true
    summary?: true
    generatedAt?: true
    updatedAt?: true
  }

  export type UserPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    mealPlan?: true
    workoutPlan?: true
    summary?: true
    generatedAt?: true
    updatedAt?: true
  }

  export type UserPlanCountAggregateInputType = {
    id?: true
    userId?: true
    mealPlan?: true
    workoutPlan?: true
    summary?: true
    generatedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPlan to aggregate.
     */
    where?: UserPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPlans to fetch.
     */
    orderBy?: UserPlanOrderByWithRelationInput | UserPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPlans
    **/
    _count?: true | UserPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPlanMaxAggregateInputType
  }

  export type GetUserPlanAggregateType<T extends UserPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPlan[P]>
      : GetScalarType<T[P], AggregateUserPlan[P]>
  }




  export type UserPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPlanWhereInput
    orderBy?: UserPlanOrderByWithAggregationInput | UserPlanOrderByWithAggregationInput[]
    by: UserPlanScalarFieldEnum[] | UserPlanScalarFieldEnum
    having?: UserPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPlanCountAggregateInputType | true
    _min?: UserPlanMinAggregateInputType
    _max?: UserPlanMaxAggregateInputType
  }

  export type UserPlanGroupByOutputType = {
    id: string
    userId: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt: Date
    updatedAt: Date
    _count: UserPlanCountAggregateOutputType | null
    _min: UserPlanMinAggregateOutputType | null
    _max: UserPlanMaxAggregateOutputType | null
  }

  type GetUserPlanGroupByPayload<T extends UserPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPlanGroupByOutputType[P]>
            : GetScalarType<T[P], UserPlanGroupByOutputType[P]>
        }
      >
    >


  export type UserPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealPlan?: boolean
    workoutPlan?: boolean
    summary?: boolean
    generatedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPlan"]>

  export type UserPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealPlan?: boolean
    workoutPlan?: boolean
    summary?: boolean
    generatedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPlan"]>

  export type UserPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealPlan?: boolean
    workoutPlan?: boolean
    summary?: boolean
    generatedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPlan"]>

  export type UserPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    mealPlan?: boolean
    workoutPlan?: boolean
    summary?: boolean
    generatedAt?: boolean
    updatedAt?: boolean
  }

  export type UserPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "mealPlan" | "workoutPlan" | "summary" | "generatedAt" | "updatedAt", ExtArgs["result"]["userPlan"]>
  export type UserPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      mealPlan: string
      workoutPlan: string
      summary: string
      generatedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userPlan"]>
    composites: {}
  }

  type UserPlanGetPayload<S extends boolean | null | undefined | UserPlanDefaultArgs> = $Result.GetResult<Prisma.$UserPlanPayload, S>

  type UserPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPlanCountAggregateInputType | true
    }

  export interface UserPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPlan'], meta: { name: 'UserPlan' } }
    /**
     * Find zero or one UserPlan that matches the filter.
     * @param {UserPlanFindUniqueArgs} args - Arguments to find a UserPlan
     * @example
     * // Get one UserPlan
     * const userPlan = await prisma.userPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPlanFindUniqueArgs>(args: SelectSubset<T, UserPlanFindUniqueArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPlanFindUniqueOrThrowArgs} args - Arguments to find a UserPlan
     * @example
     * // Get one UserPlan
     * const userPlan = await prisma.userPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanFindFirstArgs} args - Arguments to find a UserPlan
     * @example
     * // Get one UserPlan
     * const userPlan = await prisma.userPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPlanFindFirstArgs>(args?: SelectSubset<T, UserPlanFindFirstArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanFindFirstOrThrowArgs} args - Arguments to find a UserPlan
     * @example
     * // Get one UserPlan
     * const userPlan = await prisma.userPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPlans
     * const userPlans = await prisma.userPlan.findMany()
     * 
     * // Get first 10 UserPlans
     * const userPlans = await prisma.userPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPlanWithIdOnly = await prisma.userPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPlanFindManyArgs>(args?: SelectSubset<T, UserPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPlan.
     * @param {UserPlanCreateArgs} args - Arguments to create a UserPlan.
     * @example
     * // Create one UserPlan
     * const UserPlan = await prisma.userPlan.create({
     *   data: {
     *     // ... data to create a UserPlan
     *   }
     * })
     * 
     */
    create<T extends UserPlanCreateArgs>(args: SelectSubset<T, UserPlanCreateArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPlans.
     * @param {UserPlanCreateManyArgs} args - Arguments to create many UserPlans.
     * @example
     * // Create many UserPlans
     * const userPlan = await prisma.userPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPlanCreateManyArgs>(args?: SelectSubset<T, UserPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserPlans and returns the data saved in the database.
     * @param {UserPlanCreateManyAndReturnArgs} args - Arguments to create many UserPlans.
     * @example
     * // Create many UserPlans
     * const userPlan = await prisma.userPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserPlans and only return the `id`
     * const userPlanWithIdOnly = await prisma.userPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, UserPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserPlan.
     * @param {UserPlanDeleteArgs} args - Arguments to delete one UserPlan.
     * @example
     * // Delete one UserPlan
     * const UserPlan = await prisma.userPlan.delete({
     *   where: {
     *     // ... filter to delete one UserPlan
     *   }
     * })
     * 
     */
    delete<T extends UserPlanDeleteArgs>(args: SelectSubset<T, UserPlanDeleteArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPlan.
     * @param {UserPlanUpdateArgs} args - Arguments to update one UserPlan.
     * @example
     * // Update one UserPlan
     * const userPlan = await prisma.userPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPlanUpdateArgs>(args: SelectSubset<T, UserPlanUpdateArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPlans.
     * @param {UserPlanDeleteManyArgs} args - Arguments to filter UserPlans to delete.
     * @example
     * // Delete a few UserPlans
     * const { count } = await prisma.userPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPlanDeleteManyArgs>(args?: SelectSubset<T, UserPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPlans
     * const userPlan = await prisma.userPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPlanUpdateManyArgs>(args: SelectSubset<T, UserPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPlans and returns the data updated in the database.
     * @param {UserPlanUpdateManyAndReturnArgs} args - Arguments to update many UserPlans.
     * @example
     * // Update many UserPlans
     * const userPlan = await prisma.userPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPlans and only return the `id`
     * const userPlanWithIdOnly = await prisma.userPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserPlan.
     * @param {UserPlanUpsertArgs} args - Arguments to update or create a UserPlan.
     * @example
     * // Update or create a UserPlan
     * const userPlan = await prisma.userPlan.upsert({
     *   create: {
     *     // ... data to create a UserPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPlan we want to update
     *   }
     * })
     */
    upsert<T extends UserPlanUpsertArgs>(args: SelectSubset<T, UserPlanUpsertArgs<ExtArgs>>): Prisma__UserPlanClient<$Result.GetResult<Prisma.$UserPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanCountArgs} args - Arguments to filter UserPlans to count.
     * @example
     * // Count the number of UserPlans
     * const count = await prisma.userPlan.count({
     *   where: {
     *     // ... the filter for the UserPlans we want to count
     *   }
     * })
    **/
    count<T extends UserPlanCountArgs>(
      args?: Subset<T, UserPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPlanAggregateArgs>(args: Subset<T, UserPlanAggregateArgs>): Prisma.PrismaPromise<GetUserPlanAggregateType<T>>

    /**
     * Group by UserPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPlanGroupByArgs['orderBy'] }
        : { orderBy?: UserPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPlan model
   */
  readonly fields: UserPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPlan model
   */
  interface UserPlanFieldRefs {
    readonly id: FieldRef<"UserPlan", 'String'>
    readonly userId: FieldRef<"UserPlan", 'String'>
    readonly mealPlan: FieldRef<"UserPlan", 'String'>
    readonly workoutPlan: FieldRef<"UserPlan", 'String'>
    readonly summary: FieldRef<"UserPlan", 'String'>
    readonly generatedAt: FieldRef<"UserPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"UserPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserPlan findUnique
   */
  export type UserPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserPlan to fetch.
     */
    where: UserPlanWhereUniqueInput
  }

  /**
   * UserPlan findUniqueOrThrow
   */
  export type UserPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserPlan to fetch.
     */
    where: UserPlanWhereUniqueInput
  }

  /**
   * UserPlan findFirst
   */
  export type UserPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserPlan to fetch.
     */
    where?: UserPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPlans to fetch.
     */
    orderBy?: UserPlanOrderByWithRelationInput | UserPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPlans.
     */
    cursor?: UserPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPlans.
     */
    distinct?: UserPlanScalarFieldEnum | UserPlanScalarFieldEnum[]
  }

  /**
   * UserPlan findFirstOrThrow
   */
  export type UserPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserPlan to fetch.
     */
    where?: UserPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPlans to fetch.
     */
    orderBy?: UserPlanOrderByWithRelationInput | UserPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPlans.
     */
    cursor?: UserPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPlans.
     */
    distinct?: UserPlanScalarFieldEnum | UserPlanScalarFieldEnum[]
  }

  /**
   * UserPlan findMany
   */
  export type UserPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserPlans to fetch.
     */
    where?: UserPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPlans to fetch.
     */
    orderBy?: UserPlanOrderByWithRelationInput | UserPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPlans.
     */
    cursor?: UserPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPlans.
     */
    distinct?: UserPlanScalarFieldEnum | UserPlanScalarFieldEnum[]
  }

  /**
   * UserPlan create
   */
  export type UserPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPlan.
     */
    data: XOR<UserPlanCreateInput, UserPlanUncheckedCreateInput>
  }

  /**
   * UserPlan createMany
   */
  export type UserPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPlans.
     */
    data: UserPlanCreateManyInput | UserPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserPlan createManyAndReturn
   */
  export type UserPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * The data used to create many UserPlans.
     */
    data: UserPlanCreateManyInput | UserPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPlan update
   */
  export type UserPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPlan.
     */
    data: XOR<UserPlanUpdateInput, UserPlanUncheckedUpdateInput>
    /**
     * Choose, which UserPlan to update.
     */
    where: UserPlanWhereUniqueInput
  }

  /**
   * UserPlan updateMany
   */
  export type UserPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPlans.
     */
    data: XOR<UserPlanUpdateManyMutationInput, UserPlanUncheckedUpdateManyInput>
    /**
     * Filter which UserPlans to update
     */
    where?: UserPlanWhereInput
    /**
     * Limit how many UserPlans to update.
     */
    limit?: number
  }

  /**
   * UserPlan updateManyAndReturn
   */
  export type UserPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * The data used to update UserPlans.
     */
    data: XOR<UserPlanUpdateManyMutationInput, UserPlanUncheckedUpdateManyInput>
    /**
     * Filter which UserPlans to update
     */
    where?: UserPlanWhereInput
    /**
     * Limit how many UserPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPlan upsert
   */
  export type UserPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPlan to update in case it exists.
     */
    where: UserPlanWhereUniqueInput
    /**
     * In case the UserPlan found by the `where` argument doesn't exist, create a new UserPlan with this data.
     */
    create: XOR<UserPlanCreateInput, UserPlanUncheckedCreateInput>
    /**
     * In case the UserPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPlanUpdateInput, UserPlanUncheckedUpdateInput>
  }

  /**
   * UserPlan delete
   */
  export type UserPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
    /**
     * Filter which UserPlan to delete.
     */
    where: UserPlanWhereUniqueInput
  }

  /**
   * UserPlan deleteMany
   */
  export type UserPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPlans to delete
     */
    where?: UserPlanWhereInput
    /**
     * Limit how many UserPlans to delete.
     */
    limit?: number
  }

  /**
   * UserPlan without action
   */
  export type UserPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPlan
     */
    select?: UserPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPlan
     */
    omit?: UserPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPlanInclude<ExtArgs> | null
  }


  /**
   * Model FoodCache
   */

  export type AggregateFoodCache = {
    _count: FoodCacheCountAggregateOutputType | null
    _min: FoodCacheMinAggregateOutputType | null
    _max: FoodCacheMaxAggregateOutputType | null
  }

  export type FoodCacheMinAggregateOutputType = {
    id: string | null
    query: string | null
    data: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodCacheMaxAggregateOutputType = {
    id: string | null
    query: string | null
    data: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodCacheCountAggregateOutputType = {
    id: number
    query: number
    data: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoodCacheMinAggregateInputType = {
    id?: true
    query?: true
    data?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodCacheMaxAggregateInputType = {
    id?: true
    query?: true
    data?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodCacheCountAggregateInputType = {
    id?: true
    query?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoodCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodCache to aggregate.
     */
    where?: FoodCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodCaches to fetch.
     */
    orderBy?: FoodCacheOrderByWithRelationInput | FoodCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoodCaches
    **/
    _count?: true | FoodCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodCacheMaxAggregateInputType
  }

  export type GetFoodCacheAggregateType<T extends FoodCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateFoodCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodCache[P]>
      : GetScalarType<T[P], AggregateFoodCache[P]>
  }




  export type FoodCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodCacheWhereInput
    orderBy?: FoodCacheOrderByWithAggregationInput | FoodCacheOrderByWithAggregationInput[]
    by: FoodCacheScalarFieldEnum[] | FoodCacheScalarFieldEnum
    having?: FoodCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodCacheCountAggregateInputType | true
    _min?: FoodCacheMinAggregateInputType
    _max?: FoodCacheMaxAggregateInputType
  }

  export type FoodCacheGroupByOutputType = {
    id: string
    query: string
    data: string
    createdAt: Date
    updatedAt: Date
    _count: FoodCacheCountAggregateOutputType | null
    _min: FoodCacheMinAggregateOutputType | null
    _max: FoodCacheMaxAggregateOutputType | null
  }

  type GetFoodCacheGroupByPayload<T extends FoodCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodCacheGroupByOutputType[P]>
            : GetScalarType<T[P], FoodCacheGroupByOutputType[P]>
        }
      >
    >


  export type FoodCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foodCache"]>

  export type FoodCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foodCache"]>

  export type FoodCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foodCache"]>

  export type FoodCacheSelectScalar = {
    id?: boolean
    query?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FoodCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "query" | "data" | "createdAt" | "updatedAt", ExtArgs["result"]["foodCache"]>

  export type $FoodCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoodCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      query: string
      data: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foodCache"]>
    composites: {}
  }

  type FoodCacheGetPayload<S extends boolean | null | undefined | FoodCacheDefaultArgs> = $Result.GetResult<Prisma.$FoodCachePayload, S>

  type FoodCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodCacheCountAggregateInputType | true
    }

  export interface FoodCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoodCache'], meta: { name: 'FoodCache' } }
    /**
     * Find zero or one FoodCache that matches the filter.
     * @param {FoodCacheFindUniqueArgs} args - Arguments to find a FoodCache
     * @example
     * // Get one FoodCache
     * const foodCache = await prisma.foodCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodCacheFindUniqueArgs>(args: SelectSubset<T, FoodCacheFindUniqueArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FoodCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodCacheFindUniqueOrThrowArgs} args - Arguments to find a FoodCache
     * @example
     * // Get one FoodCache
     * const foodCache = await prisma.foodCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheFindFirstArgs} args - Arguments to find a FoodCache
     * @example
     * // Get one FoodCache
     * const foodCache = await prisma.foodCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodCacheFindFirstArgs>(args?: SelectSubset<T, FoodCacheFindFirstArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheFindFirstOrThrowArgs} args - Arguments to find a FoodCache
     * @example
     * // Get one FoodCache
     * const foodCache = await prisma.foodCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FoodCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodCaches
     * const foodCaches = await prisma.foodCache.findMany()
     * 
     * // Get first 10 FoodCaches
     * const foodCaches = await prisma.foodCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodCacheWithIdOnly = await prisma.foodCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodCacheFindManyArgs>(args?: SelectSubset<T, FoodCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FoodCache.
     * @param {FoodCacheCreateArgs} args - Arguments to create a FoodCache.
     * @example
     * // Create one FoodCache
     * const FoodCache = await prisma.foodCache.create({
     *   data: {
     *     // ... data to create a FoodCache
     *   }
     * })
     * 
     */
    create<T extends FoodCacheCreateArgs>(args: SelectSubset<T, FoodCacheCreateArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FoodCaches.
     * @param {FoodCacheCreateManyArgs} args - Arguments to create many FoodCaches.
     * @example
     * // Create many FoodCaches
     * const foodCache = await prisma.foodCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodCacheCreateManyArgs>(args?: SelectSubset<T, FoodCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoodCaches and returns the data saved in the database.
     * @param {FoodCacheCreateManyAndReturnArgs} args - Arguments to create many FoodCaches.
     * @example
     * // Create many FoodCaches
     * const foodCache = await prisma.foodCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoodCaches and only return the `id`
     * const foodCacheWithIdOnly = await prisma.foodCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FoodCache.
     * @param {FoodCacheDeleteArgs} args - Arguments to delete one FoodCache.
     * @example
     * // Delete one FoodCache
     * const FoodCache = await prisma.foodCache.delete({
     *   where: {
     *     // ... filter to delete one FoodCache
     *   }
     * })
     * 
     */
    delete<T extends FoodCacheDeleteArgs>(args: SelectSubset<T, FoodCacheDeleteArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FoodCache.
     * @param {FoodCacheUpdateArgs} args - Arguments to update one FoodCache.
     * @example
     * // Update one FoodCache
     * const foodCache = await prisma.foodCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodCacheUpdateArgs>(args: SelectSubset<T, FoodCacheUpdateArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FoodCaches.
     * @param {FoodCacheDeleteManyArgs} args - Arguments to filter FoodCaches to delete.
     * @example
     * // Delete a few FoodCaches
     * const { count } = await prisma.foodCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodCacheDeleteManyArgs>(args?: SelectSubset<T, FoodCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodCaches
     * const foodCache = await prisma.foodCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodCacheUpdateManyArgs>(args: SelectSubset<T, FoodCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodCaches and returns the data updated in the database.
     * @param {FoodCacheUpdateManyAndReturnArgs} args - Arguments to update many FoodCaches.
     * @example
     * // Update many FoodCaches
     * const foodCache = await prisma.foodCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FoodCaches and only return the `id`
     * const foodCacheWithIdOnly = await prisma.foodCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FoodCache.
     * @param {FoodCacheUpsertArgs} args - Arguments to update or create a FoodCache.
     * @example
     * // Update or create a FoodCache
     * const foodCache = await prisma.foodCache.upsert({
     *   create: {
     *     // ... data to create a FoodCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodCache we want to update
     *   }
     * })
     */
    upsert<T extends FoodCacheUpsertArgs>(args: SelectSubset<T, FoodCacheUpsertArgs<ExtArgs>>): Prisma__FoodCacheClient<$Result.GetResult<Prisma.$FoodCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FoodCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheCountArgs} args - Arguments to filter FoodCaches to count.
     * @example
     * // Count the number of FoodCaches
     * const count = await prisma.foodCache.count({
     *   where: {
     *     // ... the filter for the FoodCaches we want to count
     *   }
     * })
    **/
    count<T extends FoodCacheCountArgs>(
      args?: Subset<T, FoodCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoodCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodCacheAggregateArgs>(args: Subset<T, FoodCacheAggregateArgs>): Prisma.PrismaPromise<GetFoodCacheAggregateType<T>>

    /**
     * Group by FoodCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodCacheGroupByArgs['orderBy'] }
        : { orderBy?: FoodCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoodCache model
   */
  readonly fields: FoodCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoodCache model
   */
  interface FoodCacheFieldRefs {
    readonly id: FieldRef<"FoodCache", 'String'>
    readonly query: FieldRef<"FoodCache", 'String'>
    readonly data: FieldRef<"FoodCache", 'String'>
    readonly createdAt: FieldRef<"FoodCache", 'DateTime'>
    readonly updatedAt: FieldRef<"FoodCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoodCache findUnique
   */
  export type FoodCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter, which FoodCache to fetch.
     */
    where: FoodCacheWhereUniqueInput
  }

  /**
   * FoodCache findUniqueOrThrow
   */
  export type FoodCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter, which FoodCache to fetch.
     */
    where: FoodCacheWhereUniqueInput
  }

  /**
   * FoodCache findFirst
   */
  export type FoodCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter, which FoodCache to fetch.
     */
    where?: FoodCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodCaches to fetch.
     */
    orderBy?: FoodCacheOrderByWithRelationInput | FoodCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodCaches.
     */
    cursor?: FoodCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodCaches.
     */
    distinct?: FoodCacheScalarFieldEnum | FoodCacheScalarFieldEnum[]
  }

  /**
   * FoodCache findFirstOrThrow
   */
  export type FoodCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter, which FoodCache to fetch.
     */
    where?: FoodCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodCaches to fetch.
     */
    orderBy?: FoodCacheOrderByWithRelationInput | FoodCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodCaches.
     */
    cursor?: FoodCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodCaches.
     */
    distinct?: FoodCacheScalarFieldEnum | FoodCacheScalarFieldEnum[]
  }

  /**
   * FoodCache findMany
   */
  export type FoodCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter, which FoodCaches to fetch.
     */
    where?: FoodCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodCaches to fetch.
     */
    orderBy?: FoodCacheOrderByWithRelationInput | FoodCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoodCaches.
     */
    cursor?: FoodCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodCaches.
     */
    distinct?: FoodCacheScalarFieldEnum | FoodCacheScalarFieldEnum[]
  }

  /**
   * FoodCache create
   */
  export type FoodCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a FoodCache.
     */
    data: XOR<FoodCacheCreateInput, FoodCacheUncheckedCreateInput>
  }

  /**
   * FoodCache createMany
   */
  export type FoodCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodCaches.
     */
    data: FoodCacheCreateManyInput | FoodCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoodCache createManyAndReturn
   */
  export type FoodCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * The data used to create many FoodCaches.
     */
    data: FoodCacheCreateManyInput | FoodCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoodCache update
   */
  export type FoodCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a FoodCache.
     */
    data: XOR<FoodCacheUpdateInput, FoodCacheUncheckedUpdateInput>
    /**
     * Choose, which FoodCache to update.
     */
    where: FoodCacheWhereUniqueInput
  }

  /**
   * FoodCache updateMany
   */
  export type FoodCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodCaches.
     */
    data: XOR<FoodCacheUpdateManyMutationInput, FoodCacheUncheckedUpdateManyInput>
    /**
     * Filter which FoodCaches to update
     */
    where?: FoodCacheWhereInput
    /**
     * Limit how many FoodCaches to update.
     */
    limit?: number
  }

  /**
   * FoodCache updateManyAndReturn
   */
  export type FoodCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * The data used to update FoodCaches.
     */
    data: XOR<FoodCacheUpdateManyMutationInput, FoodCacheUncheckedUpdateManyInput>
    /**
     * Filter which FoodCaches to update
     */
    where?: FoodCacheWhereInput
    /**
     * Limit how many FoodCaches to update.
     */
    limit?: number
  }

  /**
   * FoodCache upsert
   */
  export type FoodCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the FoodCache to update in case it exists.
     */
    where: FoodCacheWhereUniqueInput
    /**
     * In case the FoodCache found by the `where` argument doesn't exist, create a new FoodCache with this data.
     */
    create: XOR<FoodCacheCreateInput, FoodCacheUncheckedCreateInput>
    /**
     * In case the FoodCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodCacheUpdateInput, FoodCacheUncheckedUpdateInput>
  }

  /**
   * FoodCache delete
   */
  export type FoodCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
    /**
     * Filter which FoodCache to delete.
     */
    where: FoodCacheWhereUniqueInput
  }

  /**
   * FoodCache deleteMany
   */
  export type FoodCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodCaches to delete
     */
    where?: FoodCacheWhereInput
    /**
     * Limit how many FoodCaches to delete.
     */
    limit?: number
  }

  /**
   * FoodCache without action
   */
  export type FoodCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCache
     */
    select?: FoodCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodCache
     */
    omit?: FoodCacheOmit<ExtArgs> | null
  }


  /**
   * Model FoodLog
   */

  export type AggregateFoodLog = {
    _count: FoodLogCountAggregateOutputType | null
    _avg: FoodLogAvgAggregateOutputType | null
    _sum: FoodLogSumAggregateOutputType | null
    _min: FoodLogMinAggregateOutputType | null
    _max: FoodLogMaxAggregateOutputType | null
  }

  export type FoodLogAvgAggregateOutputType = {
    qty: number | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
  }

  export type FoodLogSumAggregateOutputType = {
    qty: number | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
  }

  export type FoodLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    qty: number | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
    mealType: string | null
    date: Date | null
  }

  export type FoodLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    qty: number | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
    mealType: string | null
    date: Date | null
  }

  export type FoodLogCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType: number
    date: number
    _all: number
  }


  export type FoodLogAvgAggregateInputType = {
    qty?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
  }

  export type FoodLogSumAggregateInputType = {
    qty?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
  }

  export type FoodLogMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    qty?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    mealType?: true
    date?: true
  }

  export type FoodLogMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    qty?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    mealType?: true
    date?: true
  }

  export type FoodLogCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    qty?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    mealType?: true
    date?: true
    _all?: true
  }

  export type FoodLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodLog to aggregate.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoodLogs
    **/
    _count?: true | FoodLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoodLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoodLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodLogMaxAggregateInputType
  }

  export type GetFoodLogAggregateType<T extends FoodLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFoodLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodLog[P]>
      : GetScalarType<T[P], AggregateFoodLog[P]>
  }




  export type FoodLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithAggregationInput | FoodLogOrderByWithAggregationInput[]
    by: FoodLogScalarFieldEnum[] | FoodLogScalarFieldEnum
    having?: FoodLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodLogCountAggregateInputType | true
    _avg?: FoodLogAvgAggregateInputType
    _sum?: FoodLogSumAggregateInputType
    _min?: FoodLogMinAggregateInputType
    _max?: FoodLogMaxAggregateInputType
  }

  export type FoodLogGroupByOutputType = {
    id: string
    userId: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType: string
    date: Date
    _count: FoodLogCountAggregateOutputType | null
    _avg: FoodLogAvgAggregateOutputType | null
    _sum: FoodLogSumAggregateOutputType | null
    _min: FoodLogMinAggregateOutputType | null
    _max: FoodLogMaxAggregateOutputType | null
  }

  type GetFoodLogGroupByPayload<T extends FoodLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodLogGroupByOutputType[P]>
            : GetScalarType<T[P], FoodLogGroupByOutputType[P]>
        }
      >
    >


  export type FoodLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    qty?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    mealType?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodLog"]>

  export type FoodLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    qty?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    mealType?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodLog"]>

  export type FoodLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    qty?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    mealType?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodLog"]>

  export type FoodLogSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    qty?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    mealType?: boolean
    date?: boolean
  }

  export type FoodLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "qty" | "cal" | "prot" | "carb" | "fat" | "mealType" | "date", ExtArgs["result"]["foodLog"]>
  export type FoodLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FoodLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FoodLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FoodLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoodLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      qty: number
      cal: number
      prot: number
      carb: number
      fat: number
      mealType: string
      date: Date
    }, ExtArgs["result"]["foodLog"]>
    composites: {}
  }

  type FoodLogGetPayload<S extends boolean | null | undefined | FoodLogDefaultArgs> = $Result.GetResult<Prisma.$FoodLogPayload, S>

  type FoodLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodLogCountAggregateInputType | true
    }

  export interface FoodLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoodLog'], meta: { name: 'FoodLog' } }
    /**
     * Find zero or one FoodLog that matches the filter.
     * @param {FoodLogFindUniqueArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodLogFindUniqueArgs>(args: SelectSubset<T, FoodLogFindUniqueArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FoodLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodLogFindUniqueOrThrowArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindFirstArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodLogFindFirstArgs>(args?: SelectSubset<T, FoodLogFindFirstArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindFirstOrThrowArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FoodLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodLogs
     * const foodLogs = await prisma.foodLog.findMany()
     * 
     * // Get first 10 FoodLogs
     * const foodLogs = await prisma.foodLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodLogWithIdOnly = await prisma.foodLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodLogFindManyArgs>(args?: SelectSubset<T, FoodLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FoodLog.
     * @param {FoodLogCreateArgs} args - Arguments to create a FoodLog.
     * @example
     * // Create one FoodLog
     * const FoodLog = await prisma.foodLog.create({
     *   data: {
     *     // ... data to create a FoodLog
     *   }
     * })
     * 
     */
    create<T extends FoodLogCreateArgs>(args: SelectSubset<T, FoodLogCreateArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FoodLogs.
     * @param {FoodLogCreateManyArgs} args - Arguments to create many FoodLogs.
     * @example
     * // Create many FoodLogs
     * const foodLog = await prisma.foodLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodLogCreateManyArgs>(args?: SelectSubset<T, FoodLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoodLogs and returns the data saved in the database.
     * @param {FoodLogCreateManyAndReturnArgs} args - Arguments to create many FoodLogs.
     * @example
     * // Create many FoodLogs
     * const foodLog = await prisma.foodLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoodLogs and only return the `id`
     * const foodLogWithIdOnly = await prisma.foodLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FoodLog.
     * @param {FoodLogDeleteArgs} args - Arguments to delete one FoodLog.
     * @example
     * // Delete one FoodLog
     * const FoodLog = await prisma.foodLog.delete({
     *   where: {
     *     // ... filter to delete one FoodLog
     *   }
     * })
     * 
     */
    delete<T extends FoodLogDeleteArgs>(args: SelectSubset<T, FoodLogDeleteArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FoodLog.
     * @param {FoodLogUpdateArgs} args - Arguments to update one FoodLog.
     * @example
     * // Update one FoodLog
     * const foodLog = await prisma.foodLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodLogUpdateArgs>(args: SelectSubset<T, FoodLogUpdateArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FoodLogs.
     * @param {FoodLogDeleteManyArgs} args - Arguments to filter FoodLogs to delete.
     * @example
     * // Delete a few FoodLogs
     * const { count } = await prisma.foodLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodLogDeleteManyArgs>(args?: SelectSubset<T, FoodLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodLogs
     * const foodLog = await prisma.foodLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodLogUpdateManyArgs>(args: SelectSubset<T, FoodLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodLogs and returns the data updated in the database.
     * @param {FoodLogUpdateManyAndReturnArgs} args - Arguments to update many FoodLogs.
     * @example
     * // Update many FoodLogs
     * const foodLog = await prisma.foodLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FoodLogs and only return the `id`
     * const foodLogWithIdOnly = await prisma.foodLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodLogUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FoodLog.
     * @param {FoodLogUpsertArgs} args - Arguments to update or create a FoodLog.
     * @example
     * // Update or create a FoodLog
     * const foodLog = await prisma.foodLog.upsert({
     *   create: {
     *     // ... data to create a FoodLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodLog we want to update
     *   }
     * })
     */
    upsert<T extends FoodLogUpsertArgs>(args: SelectSubset<T, FoodLogUpsertArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogCountArgs} args - Arguments to filter FoodLogs to count.
     * @example
     * // Count the number of FoodLogs
     * const count = await prisma.foodLog.count({
     *   where: {
     *     // ... the filter for the FoodLogs we want to count
     *   }
     * })
    **/
    count<T extends FoodLogCountArgs>(
      args?: Subset<T, FoodLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodLogAggregateArgs>(args: Subset<T, FoodLogAggregateArgs>): Prisma.PrismaPromise<GetFoodLogAggregateType<T>>

    /**
     * Group by FoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodLogGroupByArgs['orderBy'] }
        : { orderBy?: FoodLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoodLog model
   */
  readonly fields: FoodLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoodLog model
   */
  interface FoodLogFieldRefs {
    readonly id: FieldRef<"FoodLog", 'String'>
    readonly userId: FieldRef<"FoodLog", 'String'>
    readonly name: FieldRef<"FoodLog", 'String'>
    readonly qty: FieldRef<"FoodLog", 'Float'>
    readonly cal: FieldRef<"FoodLog", 'Float'>
    readonly prot: FieldRef<"FoodLog", 'Float'>
    readonly carb: FieldRef<"FoodLog", 'Float'>
    readonly fat: FieldRef<"FoodLog", 'Float'>
    readonly mealType: FieldRef<"FoodLog", 'String'>
    readonly date: FieldRef<"FoodLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoodLog findUnique
   */
  export type FoodLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog findUniqueOrThrow
   */
  export type FoodLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog findFirst
   */
  export type FoodLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodLogs.
     */
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog findFirstOrThrow
   */
  export type FoodLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodLogs.
     */
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog findMany
   */
  export type FoodLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLogs to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodLogs.
     */
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog create
   */
  export type FoodLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The data needed to create a FoodLog.
     */
    data: XOR<FoodLogCreateInput, FoodLogUncheckedCreateInput>
  }

  /**
   * FoodLog createMany
   */
  export type FoodLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodLogs.
     */
    data: FoodLogCreateManyInput | FoodLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoodLog createManyAndReturn
   */
  export type FoodLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * The data used to create many FoodLogs.
     */
    data: FoodLogCreateManyInput | FoodLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodLog update
   */
  export type FoodLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The data needed to update a FoodLog.
     */
    data: XOR<FoodLogUpdateInput, FoodLogUncheckedUpdateInput>
    /**
     * Choose, which FoodLog to update.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog updateMany
   */
  export type FoodLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodLogs.
     */
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyInput>
    /**
     * Filter which FoodLogs to update
     */
    where?: FoodLogWhereInput
    /**
     * Limit how many FoodLogs to update.
     */
    limit?: number
  }

  /**
   * FoodLog updateManyAndReturn
   */
  export type FoodLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * The data used to update FoodLogs.
     */
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyInput>
    /**
     * Filter which FoodLogs to update
     */
    where?: FoodLogWhereInput
    /**
     * Limit how many FoodLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodLog upsert
   */
  export type FoodLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The filter to search for the FoodLog to update in case it exists.
     */
    where: FoodLogWhereUniqueInput
    /**
     * In case the FoodLog found by the `where` argument doesn't exist, create a new FoodLog with this data.
     */
    create: XOR<FoodLogCreateInput, FoodLogUncheckedCreateInput>
    /**
     * In case the FoodLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodLogUpdateInput, FoodLogUncheckedUpdateInput>
  }

  /**
   * FoodLog delete
   */
  export type FoodLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter which FoodLog to delete.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog deleteMany
   */
  export type FoodLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodLogs to delete
     */
    where?: FoodLogWhereInput
    /**
     * Limit how many FoodLogs to delete.
     */
    limit?: number
  }

  /**
   * FoodLog without action
   */
  export type FoodLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodLog
     */
    omit?: FoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
  }


  /**
   * Model StepLog
   */

  export type AggregateStepLog = {
    _count: StepLogCountAggregateOutputType | null
    _avg: StepLogAvgAggregateOutputType | null
    _sum: StepLogSumAggregateOutputType | null
    _min: StepLogMinAggregateOutputType | null
    _max: StepLogMaxAggregateOutputType | null
  }

  export type StepLogAvgAggregateOutputType = {
    count: number | null
  }

  export type StepLogSumAggregateOutputType = {
    count: number | null
  }

  export type StepLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    count: number | null
    date: Date | null
  }

  export type StepLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    count: number | null
    date: Date | null
  }

  export type StepLogCountAggregateOutputType = {
    id: number
    userId: number
    count: number
    date: number
    _all: number
  }


  export type StepLogAvgAggregateInputType = {
    count?: true
  }

  export type StepLogSumAggregateInputType = {
    count?: true
  }

  export type StepLogMinAggregateInputType = {
    id?: true
    userId?: true
    count?: true
    date?: true
  }

  export type StepLogMaxAggregateInputType = {
    id?: true
    userId?: true
    count?: true
    date?: true
  }

  export type StepLogCountAggregateInputType = {
    id?: true
    userId?: true
    count?: true
    date?: true
    _all?: true
  }

  export type StepLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepLog to aggregate.
     */
    where?: StepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepLogs to fetch.
     */
    orderBy?: StepLogOrderByWithRelationInput | StepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StepLogs
    **/
    _count?: true | StepLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StepLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StepLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StepLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StepLogMaxAggregateInputType
  }

  export type GetStepLogAggregateType<T extends StepLogAggregateArgs> = {
        [P in keyof T & keyof AggregateStepLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStepLog[P]>
      : GetScalarType<T[P], AggregateStepLog[P]>
  }




  export type StepLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepLogWhereInput
    orderBy?: StepLogOrderByWithAggregationInput | StepLogOrderByWithAggregationInput[]
    by: StepLogScalarFieldEnum[] | StepLogScalarFieldEnum
    having?: StepLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StepLogCountAggregateInputType | true
    _avg?: StepLogAvgAggregateInputType
    _sum?: StepLogSumAggregateInputType
    _min?: StepLogMinAggregateInputType
    _max?: StepLogMaxAggregateInputType
  }

  export type StepLogGroupByOutputType = {
    id: string
    userId: string
    count: number
    date: Date
    _count: StepLogCountAggregateOutputType | null
    _avg: StepLogAvgAggregateOutputType | null
    _sum: StepLogSumAggregateOutputType | null
    _min: StepLogMinAggregateOutputType | null
    _max: StepLogMaxAggregateOutputType | null
  }

  type GetStepLogGroupByPayload<T extends StepLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StepLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StepLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StepLogGroupByOutputType[P]>
            : GetScalarType<T[P], StepLogGroupByOutputType[P]>
        }
      >
    >


  export type StepLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    count?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepLog"]>

  export type StepLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    count?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepLog"]>

  export type StepLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    count?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepLog"]>

  export type StepLogSelectScalar = {
    id?: boolean
    userId?: boolean
    count?: boolean
    date?: boolean
  }

  export type StepLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "count" | "date", ExtArgs["result"]["stepLog"]>
  export type StepLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StepLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StepLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StepLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StepLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      count: number
      date: Date
    }, ExtArgs["result"]["stepLog"]>
    composites: {}
  }

  type StepLogGetPayload<S extends boolean | null | undefined | StepLogDefaultArgs> = $Result.GetResult<Prisma.$StepLogPayload, S>

  type StepLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StepLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StepLogCountAggregateInputType | true
    }

  export interface StepLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StepLog'], meta: { name: 'StepLog' } }
    /**
     * Find zero or one StepLog that matches the filter.
     * @param {StepLogFindUniqueArgs} args - Arguments to find a StepLog
     * @example
     * // Get one StepLog
     * const stepLog = await prisma.stepLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StepLogFindUniqueArgs>(args: SelectSubset<T, StepLogFindUniqueArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StepLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StepLogFindUniqueOrThrowArgs} args - Arguments to find a StepLog
     * @example
     * // Get one StepLog
     * const stepLog = await prisma.stepLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StepLogFindUniqueOrThrowArgs>(args: SelectSubset<T, StepLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogFindFirstArgs} args - Arguments to find a StepLog
     * @example
     * // Get one StepLog
     * const stepLog = await prisma.stepLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StepLogFindFirstArgs>(args?: SelectSubset<T, StepLogFindFirstArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogFindFirstOrThrowArgs} args - Arguments to find a StepLog
     * @example
     * // Get one StepLog
     * const stepLog = await prisma.stepLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StepLogFindFirstOrThrowArgs>(args?: SelectSubset<T, StepLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StepLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StepLogs
     * const stepLogs = await prisma.stepLog.findMany()
     * 
     * // Get first 10 StepLogs
     * const stepLogs = await prisma.stepLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stepLogWithIdOnly = await prisma.stepLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StepLogFindManyArgs>(args?: SelectSubset<T, StepLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StepLog.
     * @param {StepLogCreateArgs} args - Arguments to create a StepLog.
     * @example
     * // Create one StepLog
     * const StepLog = await prisma.stepLog.create({
     *   data: {
     *     // ... data to create a StepLog
     *   }
     * })
     * 
     */
    create<T extends StepLogCreateArgs>(args: SelectSubset<T, StepLogCreateArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StepLogs.
     * @param {StepLogCreateManyArgs} args - Arguments to create many StepLogs.
     * @example
     * // Create many StepLogs
     * const stepLog = await prisma.stepLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StepLogCreateManyArgs>(args?: SelectSubset<T, StepLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StepLogs and returns the data saved in the database.
     * @param {StepLogCreateManyAndReturnArgs} args - Arguments to create many StepLogs.
     * @example
     * // Create many StepLogs
     * const stepLog = await prisma.stepLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StepLogs and only return the `id`
     * const stepLogWithIdOnly = await prisma.stepLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StepLogCreateManyAndReturnArgs>(args?: SelectSubset<T, StepLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StepLog.
     * @param {StepLogDeleteArgs} args - Arguments to delete one StepLog.
     * @example
     * // Delete one StepLog
     * const StepLog = await prisma.stepLog.delete({
     *   where: {
     *     // ... filter to delete one StepLog
     *   }
     * })
     * 
     */
    delete<T extends StepLogDeleteArgs>(args: SelectSubset<T, StepLogDeleteArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StepLog.
     * @param {StepLogUpdateArgs} args - Arguments to update one StepLog.
     * @example
     * // Update one StepLog
     * const stepLog = await prisma.stepLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StepLogUpdateArgs>(args: SelectSubset<T, StepLogUpdateArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StepLogs.
     * @param {StepLogDeleteManyArgs} args - Arguments to filter StepLogs to delete.
     * @example
     * // Delete a few StepLogs
     * const { count } = await prisma.stepLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StepLogDeleteManyArgs>(args?: SelectSubset<T, StepLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StepLogs
     * const stepLog = await prisma.stepLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StepLogUpdateManyArgs>(args: SelectSubset<T, StepLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepLogs and returns the data updated in the database.
     * @param {StepLogUpdateManyAndReturnArgs} args - Arguments to update many StepLogs.
     * @example
     * // Update many StepLogs
     * const stepLog = await prisma.stepLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StepLogs and only return the `id`
     * const stepLogWithIdOnly = await prisma.stepLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StepLogUpdateManyAndReturnArgs>(args: SelectSubset<T, StepLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StepLog.
     * @param {StepLogUpsertArgs} args - Arguments to update or create a StepLog.
     * @example
     * // Update or create a StepLog
     * const stepLog = await prisma.stepLog.upsert({
     *   create: {
     *     // ... data to create a StepLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StepLog we want to update
     *   }
     * })
     */
    upsert<T extends StepLogUpsertArgs>(args: SelectSubset<T, StepLogUpsertArgs<ExtArgs>>): Prisma__StepLogClient<$Result.GetResult<Prisma.$StepLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StepLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogCountArgs} args - Arguments to filter StepLogs to count.
     * @example
     * // Count the number of StepLogs
     * const count = await prisma.stepLog.count({
     *   where: {
     *     // ... the filter for the StepLogs we want to count
     *   }
     * })
    **/
    count<T extends StepLogCountArgs>(
      args?: Subset<T, StepLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StepLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StepLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StepLogAggregateArgs>(args: Subset<T, StepLogAggregateArgs>): Prisma.PrismaPromise<GetStepLogAggregateType<T>>

    /**
     * Group by StepLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StepLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StepLogGroupByArgs['orderBy'] }
        : { orderBy?: StepLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StepLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStepLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StepLog model
   */
  readonly fields: StepLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StepLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StepLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StepLog model
   */
  interface StepLogFieldRefs {
    readonly id: FieldRef<"StepLog", 'String'>
    readonly userId: FieldRef<"StepLog", 'String'>
    readonly count: FieldRef<"StepLog", 'Int'>
    readonly date: FieldRef<"StepLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StepLog findUnique
   */
  export type StepLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter, which StepLog to fetch.
     */
    where: StepLogWhereUniqueInput
  }

  /**
   * StepLog findUniqueOrThrow
   */
  export type StepLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter, which StepLog to fetch.
     */
    where: StepLogWhereUniqueInput
  }

  /**
   * StepLog findFirst
   */
  export type StepLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter, which StepLog to fetch.
     */
    where?: StepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepLogs to fetch.
     */
    orderBy?: StepLogOrderByWithRelationInput | StepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepLogs.
     */
    cursor?: StepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepLogs.
     */
    distinct?: StepLogScalarFieldEnum | StepLogScalarFieldEnum[]
  }

  /**
   * StepLog findFirstOrThrow
   */
  export type StepLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter, which StepLog to fetch.
     */
    where?: StepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepLogs to fetch.
     */
    orderBy?: StepLogOrderByWithRelationInput | StepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepLogs.
     */
    cursor?: StepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepLogs.
     */
    distinct?: StepLogScalarFieldEnum | StepLogScalarFieldEnum[]
  }

  /**
   * StepLog findMany
   */
  export type StepLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter, which StepLogs to fetch.
     */
    where?: StepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepLogs to fetch.
     */
    orderBy?: StepLogOrderByWithRelationInput | StepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StepLogs.
     */
    cursor?: StepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepLogs.
     */
    distinct?: StepLogScalarFieldEnum | StepLogScalarFieldEnum[]
  }

  /**
   * StepLog create
   */
  export type StepLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * The data needed to create a StepLog.
     */
    data: XOR<StepLogCreateInput, StepLogUncheckedCreateInput>
  }

  /**
   * StepLog createMany
   */
  export type StepLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StepLogs.
     */
    data: StepLogCreateManyInput | StepLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StepLog createManyAndReturn
   */
  export type StepLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * The data used to create many StepLogs.
     */
    data: StepLogCreateManyInput | StepLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepLog update
   */
  export type StepLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * The data needed to update a StepLog.
     */
    data: XOR<StepLogUpdateInput, StepLogUncheckedUpdateInput>
    /**
     * Choose, which StepLog to update.
     */
    where: StepLogWhereUniqueInput
  }

  /**
   * StepLog updateMany
   */
  export type StepLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StepLogs.
     */
    data: XOR<StepLogUpdateManyMutationInput, StepLogUncheckedUpdateManyInput>
    /**
     * Filter which StepLogs to update
     */
    where?: StepLogWhereInput
    /**
     * Limit how many StepLogs to update.
     */
    limit?: number
  }

  /**
   * StepLog updateManyAndReturn
   */
  export type StepLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * The data used to update StepLogs.
     */
    data: XOR<StepLogUpdateManyMutationInput, StepLogUncheckedUpdateManyInput>
    /**
     * Filter which StepLogs to update
     */
    where?: StepLogWhereInput
    /**
     * Limit how many StepLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepLog upsert
   */
  export type StepLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * The filter to search for the StepLog to update in case it exists.
     */
    where: StepLogWhereUniqueInput
    /**
     * In case the StepLog found by the `where` argument doesn't exist, create a new StepLog with this data.
     */
    create: XOR<StepLogCreateInput, StepLogUncheckedCreateInput>
    /**
     * In case the StepLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StepLogUpdateInput, StepLogUncheckedUpdateInput>
  }

  /**
   * StepLog delete
   */
  export type StepLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
    /**
     * Filter which StepLog to delete.
     */
    where: StepLogWhereUniqueInput
  }

  /**
   * StepLog deleteMany
   */
  export type StepLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepLogs to delete
     */
    where?: StepLogWhereInput
    /**
     * Limit how many StepLogs to delete.
     */
    limit?: number
  }

  /**
   * StepLog without action
   */
  export type StepLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepLog
     */
    select?: StepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepLog
     */
    omit?: StepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepLogInclude<ExtArgs> | null
  }


  /**
   * Model FavoriteFood
   */

  export type AggregateFavoriteFood = {
    _count: FavoriteFoodCountAggregateOutputType | null
    _avg: FavoriteFoodAvgAggregateOutputType | null
    _sum: FavoriteFoodSumAggregateOutputType | null
    _min: FavoriteFoodMinAggregateOutputType | null
    _max: FavoriteFoodMaxAggregateOutputType | null
  }

  export type FavoriteFoodAvgAggregateOutputType = {
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
  }

  export type FavoriteFoodSumAggregateOutputType = {
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
  }

  export type FavoriteFoodMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
    createdAt: Date | null
  }

  export type FavoriteFoodMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    cal: number | null
    prot: number | null
    carb: number | null
    fat: number | null
    createdAt: Date | null
  }

  export type FavoriteFoodCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt: number
    _all: number
  }


  export type FavoriteFoodAvgAggregateInputType = {
    cal?: true
    prot?: true
    carb?: true
    fat?: true
  }

  export type FavoriteFoodSumAggregateInputType = {
    cal?: true
    prot?: true
    carb?: true
    fat?: true
  }

  export type FavoriteFoodMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    createdAt?: true
  }

  export type FavoriteFoodMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    createdAt?: true
  }

  export type FavoriteFoodCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    cal?: true
    prot?: true
    carb?: true
    fat?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteFoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteFood to aggregate.
     */
    where?: FavoriteFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteFoods to fetch.
     */
    orderBy?: FavoriteFoodOrderByWithRelationInput | FavoriteFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FavoriteFoods
    **/
    _count?: true | FavoriteFoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavoriteFoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavoriteFoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteFoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteFoodMaxAggregateInputType
  }

  export type GetFavoriteFoodAggregateType<T extends FavoriteFoodAggregateArgs> = {
        [P in keyof T & keyof AggregateFavoriteFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavoriteFood[P]>
      : GetScalarType<T[P], AggregateFavoriteFood[P]>
  }




  export type FavoriteFoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteFoodWhereInput
    orderBy?: FavoriteFoodOrderByWithAggregationInput | FavoriteFoodOrderByWithAggregationInput[]
    by: FavoriteFoodScalarFieldEnum[] | FavoriteFoodScalarFieldEnum
    having?: FavoriteFoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteFoodCountAggregateInputType | true
    _avg?: FavoriteFoodAvgAggregateInputType
    _sum?: FavoriteFoodSumAggregateInputType
    _min?: FavoriteFoodMinAggregateInputType
    _max?: FavoriteFoodMaxAggregateInputType
  }

  export type FavoriteFoodGroupByOutputType = {
    id: string
    userId: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt: Date
    _count: FavoriteFoodCountAggregateOutputType | null
    _avg: FavoriteFoodAvgAggregateOutputType | null
    _sum: FavoriteFoodSumAggregateOutputType | null
    _min: FavoriteFoodMinAggregateOutputType | null
    _max: FavoriteFoodMaxAggregateOutputType | null
  }

  type GetFavoriteFoodGroupByPayload<T extends FavoriteFoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteFoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteFoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteFoodGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteFoodGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteFoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoriteFood"]>

  export type FavoriteFoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoriteFood"]>

  export type FavoriteFoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoriteFood"]>

  export type FavoriteFoodSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    cal?: boolean
    prot?: boolean
    carb?: boolean
    fat?: boolean
    createdAt?: boolean
  }

  export type FavoriteFoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "cal" | "prot" | "carb" | "fat" | "createdAt", ExtArgs["result"]["favoriteFood"]>
  export type FavoriteFoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteFoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteFoodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FavoriteFoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FavoriteFood"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      cal: number
      prot: number
      carb: number
      fat: number
      createdAt: Date
    }, ExtArgs["result"]["favoriteFood"]>
    composites: {}
  }

  type FavoriteFoodGetPayload<S extends boolean | null | undefined | FavoriteFoodDefaultArgs> = $Result.GetResult<Prisma.$FavoriteFoodPayload, S>

  type FavoriteFoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteFoodCountAggregateInputType | true
    }

  export interface FavoriteFoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FavoriteFood'], meta: { name: 'FavoriteFood' } }
    /**
     * Find zero or one FavoriteFood that matches the filter.
     * @param {FavoriteFoodFindUniqueArgs} args - Arguments to find a FavoriteFood
     * @example
     * // Get one FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFoodFindUniqueArgs>(args: SelectSubset<T, FavoriteFoodFindUniqueArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FavoriteFood that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFoodFindUniqueOrThrowArgs} args - Arguments to find a FavoriteFood
     * @example
     * // Get one FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFoodFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteFood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodFindFirstArgs} args - Arguments to find a FavoriteFood
     * @example
     * // Get one FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFoodFindFirstArgs>(args?: SelectSubset<T, FavoriteFoodFindFirstArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteFood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodFindFirstOrThrowArgs} args - Arguments to find a FavoriteFood
     * @example
     * // Get one FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFoodFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FavoriteFoods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FavoriteFoods
     * const favoriteFoods = await prisma.favoriteFood.findMany()
     * 
     * // Get first 10 FavoriteFoods
     * const favoriteFoods = await prisma.favoriteFood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteFoodWithIdOnly = await prisma.favoriteFood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFoodFindManyArgs>(args?: SelectSubset<T, FavoriteFoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FavoriteFood.
     * @param {FavoriteFoodCreateArgs} args - Arguments to create a FavoriteFood.
     * @example
     * // Create one FavoriteFood
     * const FavoriteFood = await prisma.favoriteFood.create({
     *   data: {
     *     // ... data to create a FavoriteFood
     *   }
     * })
     * 
     */
    create<T extends FavoriteFoodCreateArgs>(args: SelectSubset<T, FavoriteFoodCreateArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FavoriteFoods.
     * @param {FavoriteFoodCreateManyArgs} args - Arguments to create many FavoriteFoods.
     * @example
     * // Create many FavoriteFoods
     * const favoriteFood = await prisma.favoriteFood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteFoodCreateManyArgs>(args?: SelectSubset<T, FavoriteFoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FavoriteFoods and returns the data saved in the database.
     * @param {FavoriteFoodCreateManyAndReturnArgs} args - Arguments to create many FavoriteFoods.
     * @example
     * // Create many FavoriteFoods
     * const favoriteFood = await prisma.favoriteFood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FavoriteFoods and only return the `id`
     * const favoriteFoodWithIdOnly = await prisma.favoriteFood.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteFoodCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteFoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FavoriteFood.
     * @param {FavoriteFoodDeleteArgs} args - Arguments to delete one FavoriteFood.
     * @example
     * // Delete one FavoriteFood
     * const FavoriteFood = await prisma.favoriteFood.delete({
     *   where: {
     *     // ... filter to delete one FavoriteFood
     *   }
     * })
     * 
     */
    delete<T extends FavoriteFoodDeleteArgs>(args: SelectSubset<T, FavoriteFoodDeleteArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FavoriteFood.
     * @param {FavoriteFoodUpdateArgs} args - Arguments to update one FavoriteFood.
     * @example
     * // Update one FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteFoodUpdateArgs>(args: SelectSubset<T, FavoriteFoodUpdateArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FavoriteFoods.
     * @param {FavoriteFoodDeleteManyArgs} args - Arguments to filter FavoriteFoods to delete.
     * @example
     * // Delete a few FavoriteFoods
     * const { count } = await prisma.favoriteFood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteFoodDeleteManyArgs>(args?: SelectSubset<T, FavoriteFoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FavoriteFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FavoriteFoods
     * const favoriteFood = await prisma.favoriteFood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteFoodUpdateManyArgs>(args: SelectSubset<T, FavoriteFoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FavoriteFoods and returns the data updated in the database.
     * @param {FavoriteFoodUpdateManyAndReturnArgs} args - Arguments to update many FavoriteFoods.
     * @example
     * // Update many FavoriteFoods
     * const favoriteFood = await prisma.favoriteFood.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FavoriteFoods and only return the `id`
     * const favoriteFoodWithIdOnly = await prisma.favoriteFood.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteFoodUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteFoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FavoriteFood.
     * @param {FavoriteFoodUpsertArgs} args - Arguments to update or create a FavoriteFood.
     * @example
     * // Update or create a FavoriteFood
     * const favoriteFood = await prisma.favoriteFood.upsert({
     *   create: {
     *     // ... data to create a FavoriteFood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FavoriteFood we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteFoodUpsertArgs>(args: SelectSubset<T, FavoriteFoodUpsertArgs<ExtArgs>>): Prisma__FavoriteFoodClient<$Result.GetResult<Prisma.$FavoriteFoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FavoriteFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodCountArgs} args - Arguments to filter FavoriteFoods to count.
     * @example
     * // Count the number of FavoriteFoods
     * const count = await prisma.favoriteFood.count({
     *   where: {
     *     // ... the filter for the FavoriteFoods we want to count
     *   }
     * })
    **/
    count<T extends FavoriteFoodCountArgs>(
      args?: Subset<T, FavoriteFoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteFoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FavoriteFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteFoodAggregateArgs>(args: Subset<T, FavoriteFoodAggregateArgs>): Prisma.PrismaPromise<GetFavoriteFoodAggregateType<T>>

    /**
     * Group by FavoriteFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteFoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteFoodGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteFoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteFoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FavoriteFood model
   */
  readonly fields: FavoriteFoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FavoriteFood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteFoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FavoriteFood model
   */
  interface FavoriteFoodFieldRefs {
    readonly id: FieldRef<"FavoriteFood", 'String'>
    readonly userId: FieldRef<"FavoriteFood", 'String'>
    readonly name: FieldRef<"FavoriteFood", 'String'>
    readonly cal: FieldRef<"FavoriteFood", 'Float'>
    readonly prot: FieldRef<"FavoriteFood", 'Float'>
    readonly carb: FieldRef<"FavoriteFood", 'Float'>
    readonly fat: FieldRef<"FavoriteFood", 'Float'>
    readonly createdAt: FieldRef<"FavoriteFood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FavoriteFood findUnique
   */
  export type FavoriteFoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteFood to fetch.
     */
    where: FavoriteFoodWhereUniqueInput
  }

  /**
   * FavoriteFood findUniqueOrThrow
   */
  export type FavoriteFoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteFood to fetch.
     */
    where: FavoriteFoodWhereUniqueInput
  }

  /**
   * FavoriteFood findFirst
   */
  export type FavoriteFoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteFood to fetch.
     */
    where?: FavoriteFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteFoods to fetch.
     */
    orderBy?: FavoriteFoodOrderByWithRelationInput | FavoriteFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteFoods.
     */
    cursor?: FavoriteFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteFoods.
     */
    distinct?: FavoriteFoodScalarFieldEnum | FavoriteFoodScalarFieldEnum[]
  }

  /**
   * FavoriteFood findFirstOrThrow
   */
  export type FavoriteFoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteFood to fetch.
     */
    where?: FavoriteFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteFoods to fetch.
     */
    orderBy?: FavoriteFoodOrderByWithRelationInput | FavoriteFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteFoods.
     */
    cursor?: FavoriteFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteFoods.
     */
    distinct?: FavoriteFoodScalarFieldEnum | FavoriteFoodScalarFieldEnum[]
  }

  /**
   * FavoriteFood findMany
   */
  export type FavoriteFoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteFoods to fetch.
     */
    where?: FavoriteFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteFoods to fetch.
     */
    orderBy?: FavoriteFoodOrderByWithRelationInput | FavoriteFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FavoriteFoods.
     */
    cursor?: FavoriteFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteFoods.
     */
    distinct?: FavoriteFoodScalarFieldEnum | FavoriteFoodScalarFieldEnum[]
  }

  /**
   * FavoriteFood create
   */
  export type FavoriteFoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * The data needed to create a FavoriteFood.
     */
    data: XOR<FavoriteFoodCreateInput, FavoriteFoodUncheckedCreateInput>
  }

  /**
   * FavoriteFood createMany
   */
  export type FavoriteFoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FavoriteFoods.
     */
    data: FavoriteFoodCreateManyInput | FavoriteFoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FavoriteFood createManyAndReturn
   */
  export type FavoriteFoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * The data used to create many FavoriteFoods.
     */
    data: FavoriteFoodCreateManyInput | FavoriteFoodCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FavoriteFood update
   */
  export type FavoriteFoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * The data needed to update a FavoriteFood.
     */
    data: XOR<FavoriteFoodUpdateInput, FavoriteFoodUncheckedUpdateInput>
    /**
     * Choose, which FavoriteFood to update.
     */
    where: FavoriteFoodWhereUniqueInput
  }

  /**
   * FavoriteFood updateMany
   */
  export type FavoriteFoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FavoriteFoods.
     */
    data: XOR<FavoriteFoodUpdateManyMutationInput, FavoriteFoodUncheckedUpdateManyInput>
    /**
     * Filter which FavoriteFoods to update
     */
    where?: FavoriteFoodWhereInput
    /**
     * Limit how many FavoriteFoods to update.
     */
    limit?: number
  }

  /**
   * FavoriteFood updateManyAndReturn
   */
  export type FavoriteFoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * The data used to update FavoriteFoods.
     */
    data: XOR<FavoriteFoodUpdateManyMutationInput, FavoriteFoodUncheckedUpdateManyInput>
    /**
     * Filter which FavoriteFoods to update
     */
    where?: FavoriteFoodWhereInput
    /**
     * Limit how many FavoriteFoods to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FavoriteFood upsert
   */
  export type FavoriteFoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * The filter to search for the FavoriteFood to update in case it exists.
     */
    where: FavoriteFoodWhereUniqueInput
    /**
     * In case the FavoriteFood found by the `where` argument doesn't exist, create a new FavoriteFood with this data.
     */
    create: XOR<FavoriteFoodCreateInput, FavoriteFoodUncheckedCreateInput>
    /**
     * In case the FavoriteFood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteFoodUpdateInput, FavoriteFoodUncheckedUpdateInput>
  }

  /**
   * FavoriteFood delete
   */
  export type FavoriteFoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
    /**
     * Filter which FavoriteFood to delete.
     */
    where: FavoriteFoodWhereUniqueInput
  }

  /**
   * FavoriteFood deleteMany
   */
  export type FavoriteFoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteFoods to delete
     */
    where?: FavoriteFoodWhereInput
    /**
     * Limit how many FavoriteFoods to delete.
     */
    limit?: number
  }

  /**
   * FavoriteFood without action
   */
  export type FavoriteFoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteFood
     */
    select?: FavoriteFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteFood
     */
    omit?: FavoriteFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteFoodInclude<ExtArgs> | null
  }


  /**
   * Model WeightLog
   */

  export type AggregateWeightLog = {
    _count: WeightLogCountAggregateOutputType | null
    _avg: WeightLogAvgAggregateOutputType | null
    _sum: WeightLogSumAggregateOutputType | null
    _min: WeightLogMinAggregateOutputType | null
    _max: WeightLogMaxAggregateOutputType | null
  }

  export type WeightLogAvgAggregateOutputType = {
    weight: number | null
  }

  export type WeightLogSumAggregateOutputType = {
    weight: number | null
  }

  export type WeightLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    weight: number | null
    date: Date | null
  }

  export type WeightLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    weight: number | null
    date: Date | null
  }

  export type WeightLogCountAggregateOutputType = {
    id: number
    userId: number
    weight: number
    date: number
    _all: number
  }


  export type WeightLogAvgAggregateInputType = {
    weight?: true
  }

  export type WeightLogSumAggregateInputType = {
    weight?: true
  }

  export type WeightLogMinAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    date?: true
  }

  export type WeightLogMaxAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    date?: true
  }

  export type WeightLogCountAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    date?: true
    _all?: true
  }

  export type WeightLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightLog to aggregate.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeightLogs
    **/
    _count?: true | WeightLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeightLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeightLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeightLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeightLogMaxAggregateInputType
  }

  export type GetWeightLogAggregateType<T extends WeightLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWeightLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeightLog[P]>
      : GetScalarType<T[P], AggregateWeightLog[P]>
  }




  export type WeightLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightLogWhereInput
    orderBy?: WeightLogOrderByWithAggregationInput | WeightLogOrderByWithAggregationInput[]
    by: WeightLogScalarFieldEnum[] | WeightLogScalarFieldEnum
    having?: WeightLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeightLogCountAggregateInputType | true
    _avg?: WeightLogAvgAggregateInputType
    _sum?: WeightLogSumAggregateInputType
    _min?: WeightLogMinAggregateInputType
    _max?: WeightLogMaxAggregateInputType
  }

  export type WeightLogGroupByOutputType = {
    id: string
    userId: string
    weight: number
    date: Date
    _count: WeightLogCountAggregateOutputType | null
    _avg: WeightLogAvgAggregateOutputType | null
    _sum: WeightLogSumAggregateOutputType | null
    _min: WeightLogMinAggregateOutputType | null
    _max: WeightLogMaxAggregateOutputType | null
  }

  type GetWeightLogGroupByPayload<T extends WeightLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeightLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeightLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeightLogGroupByOutputType[P]>
            : GetScalarType<T[P], WeightLogGroupByOutputType[P]>
        }
      >
    >


  export type WeightLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weight?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightLog"]>

  export type WeightLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weight?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightLog"]>

  export type WeightLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weight?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightLog"]>

  export type WeightLogSelectScalar = {
    id?: boolean
    userId?: boolean
    weight?: boolean
    date?: boolean
  }

  export type WeightLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "weight" | "date", ExtArgs["result"]["weightLog"]>
  export type WeightLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeightLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeightLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WeightLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeightLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      weight: number
      date: Date
    }, ExtArgs["result"]["weightLog"]>
    composites: {}
  }

  type WeightLogGetPayload<S extends boolean | null | undefined | WeightLogDefaultArgs> = $Result.GetResult<Prisma.$WeightLogPayload, S>

  type WeightLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeightLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeightLogCountAggregateInputType | true
    }

  export interface WeightLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeightLog'], meta: { name: 'WeightLog' } }
    /**
     * Find zero or one WeightLog that matches the filter.
     * @param {WeightLogFindUniqueArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeightLogFindUniqueArgs>(args: SelectSubset<T, WeightLogFindUniqueArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeightLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeightLogFindUniqueOrThrowArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeightLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WeightLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindFirstArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeightLogFindFirstArgs>(args?: SelectSubset<T, WeightLogFindFirstArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindFirstOrThrowArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeightLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WeightLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeightLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeightLogs
     * const weightLogs = await prisma.weightLog.findMany()
     * 
     * // Get first 10 WeightLogs
     * const weightLogs = await prisma.weightLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weightLogWithIdOnly = await prisma.weightLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeightLogFindManyArgs>(args?: SelectSubset<T, WeightLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeightLog.
     * @param {WeightLogCreateArgs} args - Arguments to create a WeightLog.
     * @example
     * // Create one WeightLog
     * const WeightLog = await prisma.weightLog.create({
     *   data: {
     *     // ... data to create a WeightLog
     *   }
     * })
     * 
     */
    create<T extends WeightLogCreateArgs>(args: SelectSubset<T, WeightLogCreateArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeightLogs.
     * @param {WeightLogCreateManyArgs} args - Arguments to create many WeightLogs.
     * @example
     * // Create many WeightLogs
     * const weightLog = await prisma.weightLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeightLogCreateManyArgs>(args?: SelectSubset<T, WeightLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeightLogs and returns the data saved in the database.
     * @param {WeightLogCreateManyAndReturnArgs} args - Arguments to create many WeightLogs.
     * @example
     * // Create many WeightLogs
     * const weightLog = await prisma.weightLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeightLogs and only return the `id`
     * const weightLogWithIdOnly = await prisma.weightLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeightLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WeightLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeightLog.
     * @param {WeightLogDeleteArgs} args - Arguments to delete one WeightLog.
     * @example
     * // Delete one WeightLog
     * const WeightLog = await prisma.weightLog.delete({
     *   where: {
     *     // ... filter to delete one WeightLog
     *   }
     * })
     * 
     */
    delete<T extends WeightLogDeleteArgs>(args: SelectSubset<T, WeightLogDeleteArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeightLog.
     * @param {WeightLogUpdateArgs} args - Arguments to update one WeightLog.
     * @example
     * // Update one WeightLog
     * const weightLog = await prisma.weightLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeightLogUpdateArgs>(args: SelectSubset<T, WeightLogUpdateArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeightLogs.
     * @param {WeightLogDeleteManyArgs} args - Arguments to filter WeightLogs to delete.
     * @example
     * // Delete a few WeightLogs
     * const { count } = await prisma.weightLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeightLogDeleteManyArgs>(args?: SelectSubset<T, WeightLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeightLogs
     * const weightLog = await prisma.weightLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeightLogUpdateManyArgs>(args: SelectSubset<T, WeightLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightLogs and returns the data updated in the database.
     * @param {WeightLogUpdateManyAndReturnArgs} args - Arguments to update many WeightLogs.
     * @example
     * // Update many WeightLogs
     * const weightLog = await prisma.weightLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeightLogs and only return the `id`
     * const weightLogWithIdOnly = await prisma.weightLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeightLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WeightLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeightLog.
     * @param {WeightLogUpsertArgs} args - Arguments to update or create a WeightLog.
     * @example
     * // Update or create a WeightLog
     * const weightLog = await prisma.weightLog.upsert({
     *   create: {
     *     // ... data to create a WeightLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeightLog we want to update
     *   }
     * })
     */
    upsert<T extends WeightLogUpsertArgs>(args: SelectSubset<T, WeightLogUpsertArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeightLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogCountArgs} args - Arguments to filter WeightLogs to count.
     * @example
     * // Count the number of WeightLogs
     * const count = await prisma.weightLog.count({
     *   where: {
     *     // ... the filter for the WeightLogs we want to count
     *   }
     * })
    **/
    count<T extends WeightLogCountArgs>(
      args?: Subset<T, WeightLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeightLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeightLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeightLogAggregateArgs>(args: Subset<T, WeightLogAggregateArgs>): Prisma.PrismaPromise<GetWeightLogAggregateType<T>>

    /**
     * Group by WeightLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeightLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeightLogGroupByArgs['orderBy'] }
        : { orderBy?: WeightLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeightLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeightLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeightLog model
   */
  readonly fields: WeightLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeightLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeightLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeightLog model
   */
  interface WeightLogFieldRefs {
    readonly id: FieldRef<"WeightLog", 'String'>
    readonly userId: FieldRef<"WeightLog", 'String'>
    readonly weight: FieldRef<"WeightLog", 'Float'>
    readonly date: FieldRef<"WeightLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeightLog findUnique
   */
  export type WeightLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog findUniqueOrThrow
   */
  export type WeightLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog findFirst
   */
  export type WeightLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightLogs.
     */
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog findFirstOrThrow
   */
  export type WeightLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightLogs.
     */
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog findMany
   */
  export type WeightLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLogs to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightLogs.
     */
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog create
   */
  export type WeightLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WeightLog.
     */
    data: XOR<WeightLogCreateInput, WeightLogUncheckedCreateInput>
  }

  /**
   * WeightLog createMany
   */
  export type WeightLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeightLogs.
     */
    data: WeightLogCreateManyInput | WeightLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeightLog createManyAndReturn
   */
  export type WeightLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * The data used to create many WeightLogs.
     */
    data: WeightLogCreateManyInput | WeightLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightLog update
   */
  export type WeightLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WeightLog.
     */
    data: XOR<WeightLogUpdateInput, WeightLogUncheckedUpdateInput>
    /**
     * Choose, which WeightLog to update.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog updateMany
   */
  export type WeightLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeightLogs.
     */
    data: XOR<WeightLogUpdateManyMutationInput, WeightLogUncheckedUpdateManyInput>
    /**
     * Filter which WeightLogs to update
     */
    where?: WeightLogWhereInput
    /**
     * Limit how many WeightLogs to update.
     */
    limit?: number
  }

  /**
   * WeightLog updateManyAndReturn
   */
  export type WeightLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * The data used to update WeightLogs.
     */
    data: XOR<WeightLogUpdateManyMutationInput, WeightLogUncheckedUpdateManyInput>
    /**
     * Filter which WeightLogs to update
     */
    where?: WeightLogWhereInput
    /**
     * Limit how many WeightLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightLog upsert
   */
  export type WeightLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WeightLog to update in case it exists.
     */
    where: WeightLogWhereUniqueInput
    /**
     * In case the WeightLog found by the `where` argument doesn't exist, create a new WeightLog with this data.
     */
    create: XOR<WeightLogCreateInput, WeightLogUncheckedCreateInput>
    /**
     * In case the WeightLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeightLogUpdateInput, WeightLogUncheckedUpdateInput>
  }

  /**
   * WeightLog delete
   */
  export type WeightLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter which WeightLog to delete.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog deleteMany
   */
  export type WeightLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightLogs to delete
     */
    where?: WeightLogWhereInput
    /**
     * Limit how many WeightLogs to delete.
     */
    limit?: number
  }

  /**
   * WeightLog without action
   */
  export type WeightLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightLog
     */
    omit?: WeightLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
  }


  /**
   * Model WaterLog
   */

  export type AggregateWaterLog = {
    _count: WaterLogCountAggregateOutputType | null
    _avg: WaterLogAvgAggregateOutputType | null
    _sum: WaterLogSumAggregateOutputType | null
    _min: WaterLogMinAggregateOutputType | null
    _max: WaterLogMaxAggregateOutputType | null
  }

  export type WaterLogAvgAggregateOutputType = {
    ml: number | null
  }

  export type WaterLogSumAggregateOutputType = {
    ml: number | null
  }

  export type WaterLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    ml: number | null
    date: Date | null
  }

  export type WaterLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    ml: number | null
    date: Date | null
  }

  export type WaterLogCountAggregateOutputType = {
    id: number
    userId: number
    ml: number
    date: number
    _all: number
  }


  export type WaterLogAvgAggregateInputType = {
    ml?: true
  }

  export type WaterLogSumAggregateInputType = {
    ml?: true
  }

  export type WaterLogMinAggregateInputType = {
    id?: true
    userId?: true
    ml?: true
    date?: true
  }

  export type WaterLogMaxAggregateInputType = {
    id?: true
    userId?: true
    ml?: true
    date?: true
  }

  export type WaterLogCountAggregateInputType = {
    id?: true
    userId?: true
    ml?: true
    date?: true
    _all?: true
  }

  export type WaterLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterLog to aggregate.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WaterLogs
    **/
    _count?: true | WaterLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WaterLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WaterLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WaterLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WaterLogMaxAggregateInputType
  }

  export type GetWaterLogAggregateType<T extends WaterLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWaterLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWaterLog[P]>
      : GetScalarType<T[P], AggregateWaterLog[P]>
  }




  export type WaterLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterLogWhereInput
    orderBy?: WaterLogOrderByWithAggregationInput | WaterLogOrderByWithAggregationInput[]
    by: WaterLogScalarFieldEnum[] | WaterLogScalarFieldEnum
    having?: WaterLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WaterLogCountAggregateInputType | true
    _avg?: WaterLogAvgAggregateInputType
    _sum?: WaterLogSumAggregateInputType
    _min?: WaterLogMinAggregateInputType
    _max?: WaterLogMaxAggregateInputType
  }

  export type WaterLogGroupByOutputType = {
    id: string
    userId: string
    ml: number
    date: Date
    _count: WaterLogCountAggregateOutputType | null
    _avg: WaterLogAvgAggregateOutputType | null
    _sum: WaterLogSumAggregateOutputType | null
    _min: WaterLogMinAggregateOutputType | null
    _max: WaterLogMaxAggregateOutputType | null
  }

  type GetWaterLogGroupByPayload<T extends WaterLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WaterLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WaterLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WaterLogGroupByOutputType[P]>
            : GetScalarType<T[P], WaterLogGroupByOutputType[P]>
        }
      >
    >


  export type WaterLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ml?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterLog"]>

  export type WaterLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ml?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterLog"]>

  export type WaterLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ml?: boolean
    date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterLog"]>

  export type WaterLogSelectScalar = {
    id?: boolean
    userId?: boolean
    ml?: boolean
    date?: boolean
  }

  export type WaterLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "ml" | "date", ExtArgs["result"]["waterLog"]>
  export type WaterLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WaterLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WaterLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WaterLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WaterLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      ml: number
      date: Date
    }, ExtArgs["result"]["waterLog"]>
    composites: {}
  }

  type WaterLogGetPayload<S extends boolean | null | undefined | WaterLogDefaultArgs> = $Result.GetResult<Prisma.$WaterLogPayload, S>

  type WaterLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WaterLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WaterLogCountAggregateInputType | true
    }

  export interface WaterLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WaterLog'], meta: { name: 'WaterLog' } }
    /**
     * Find zero or one WaterLog that matches the filter.
     * @param {WaterLogFindUniqueArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WaterLogFindUniqueArgs>(args: SelectSubset<T, WaterLogFindUniqueArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WaterLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WaterLogFindUniqueOrThrowArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WaterLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WaterLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaterLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindFirstArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WaterLogFindFirstArgs>(args?: SelectSubset<T, WaterLogFindFirstArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaterLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindFirstOrThrowArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WaterLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WaterLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WaterLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WaterLogs
     * const waterLogs = await prisma.waterLog.findMany()
     * 
     * // Get first 10 WaterLogs
     * const waterLogs = await prisma.waterLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const waterLogWithIdOnly = await prisma.waterLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WaterLogFindManyArgs>(args?: SelectSubset<T, WaterLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WaterLog.
     * @param {WaterLogCreateArgs} args - Arguments to create a WaterLog.
     * @example
     * // Create one WaterLog
     * const WaterLog = await prisma.waterLog.create({
     *   data: {
     *     // ... data to create a WaterLog
     *   }
     * })
     * 
     */
    create<T extends WaterLogCreateArgs>(args: SelectSubset<T, WaterLogCreateArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WaterLogs.
     * @param {WaterLogCreateManyArgs} args - Arguments to create many WaterLogs.
     * @example
     * // Create many WaterLogs
     * const waterLog = await prisma.waterLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WaterLogCreateManyArgs>(args?: SelectSubset<T, WaterLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WaterLogs and returns the data saved in the database.
     * @param {WaterLogCreateManyAndReturnArgs} args - Arguments to create many WaterLogs.
     * @example
     * // Create many WaterLogs
     * const waterLog = await prisma.waterLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WaterLogs and only return the `id`
     * const waterLogWithIdOnly = await prisma.waterLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WaterLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WaterLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WaterLog.
     * @param {WaterLogDeleteArgs} args - Arguments to delete one WaterLog.
     * @example
     * // Delete one WaterLog
     * const WaterLog = await prisma.waterLog.delete({
     *   where: {
     *     // ... filter to delete one WaterLog
     *   }
     * })
     * 
     */
    delete<T extends WaterLogDeleteArgs>(args: SelectSubset<T, WaterLogDeleteArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WaterLog.
     * @param {WaterLogUpdateArgs} args - Arguments to update one WaterLog.
     * @example
     * // Update one WaterLog
     * const waterLog = await prisma.waterLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WaterLogUpdateArgs>(args: SelectSubset<T, WaterLogUpdateArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WaterLogs.
     * @param {WaterLogDeleteManyArgs} args - Arguments to filter WaterLogs to delete.
     * @example
     * // Delete a few WaterLogs
     * const { count } = await prisma.waterLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WaterLogDeleteManyArgs>(args?: SelectSubset<T, WaterLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaterLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WaterLogs
     * const waterLog = await prisma.waterLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WaterLogUpdateManyArgs>(args: SelectSubset<T, WaterLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaterLogs and returns the data updated in the database.
     * @param {WaterLogUpdateManyAndReturnArgs} args - Arguments to update many WaterLogs.
     * @example
     * // Update many WaterLogs
     * const waterLog = await prisma.waterLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WaterLogs and only return the `id`
     * const waterLogWithIdOnly = await prisma.waterLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WaterLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WaterLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WaterLog.
     * @param {WaterLogUpsertArgs} args - Arguments to update or create a WaterLog.
     * @example
     * // Update or create a WaterLog
     * const waterLog = await prisma.waterLog.upsert({
     *   create: {
     *     // ... data to create a WaterLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WaterLog we want to update
     *   }
     * })
     */
    upsert<T extends WaterLogUpsertArgs>(args: SelectSubset<T, WaterLogUpsertArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WaterLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogCountArgs} args - Arguments to filter WaterLogs to count.
     * @example
     * // Count the number of WaterLogs
     * const count = await prisma.waterLog.count({
     *   where: {
     *     // ... the filter for the WaterLogs we want to count
     *   }
     * })
    **/
    count<T extends WaterLogCountArgs>(
      args?: Subset<T, WaterLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WaterLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WaterLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WaterLogAggregateArgs>(args: Subset<T, WaterLogAggregateArgs>): Prisma.PrismaPromise<GetWaterLogAggregateType<T>>

    /**
     * Group by WaterLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WaterLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WaterLogGroupByArgs['orderBy'] }
        : { orderBy?: WaterLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WaterLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaterLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WaterLog model
   */
  readonly fields: WaterLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WaterLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WaterLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WaterLog model
   */
  interface WaterLogFieldRefs {
    readonly id: FieldRef<"WaterLog", 'String'>
    readonly userId: FieldRef<"WaterLog", 'String'>
    readonly ml: FieldRef<"WaterLog", 'Int'>
    readonly date: FieldRef<"WaterLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WaterLog findUnique
   */
  export type WaterLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog findUniqueOrThrow
   */
  export type WaterLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog findFirst
   */
  export type WaterLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterLogs.
     */
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog findFirstOrThrow
   */
  export type WaterLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterLogs.
     */
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog findMany
   */
  export type WaterLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLogs to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterLogs.
     */
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog create
   */
  export type WaterLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WaterLog.
     */
    data: XOR<WaterLogCreateInput, WaterLogUncheckedCreateInput>
  }

  /**
   * WaterLog createMany
   */
  export type WaterLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WaterLogs.
     */
    data: WaterLogCreateManyInput | WaterLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WaterLog createManyAndReturn
   */
  export type WaterLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * The data used to create many WaterLogs.
     */
    data: WaterLogCreateManyInput | WaterLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaterLog update
   */
  export type WaterLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WaterLog.
     */
    data: XOR<WaterLogUpdateInput, WaterLogUncheckedUpdateInput>
    /**
     * Choose, which WaterLog to update.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog updateMany
   */
  export type WaterLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WaterLogs.
     */
    data: XOR<WaterLogUpdateManyMutationInput, WaterLogUncheckedUpdateManyInput>
    /**
     * Filter which WaterLogs to update
     */
    where?: WaterLogWhereInput
    /**
     * Limit how many WaterLogs to update.
     */
    limit?: number
  }

  /**
   * WaterLog updateManyAndReturn
   */
  export type WaterLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * The data used to update WaterLogs.
     */
    data: XOR<WaterLogUpdateManyMutationInput, WaterLogUncheckedUpdateManyInput>
    /**
     * Filter which WaterLogs to update
     */
    where?: WaterLogWhereInput
    /**
     * Limit how many WaterLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaterLog upsert
   */
  export type WaterLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WaterLog to update in case it exists.
     */
    where: WaterLogWhereUniqueInput
    /**
     * In case the WaterLog found by the `where` argument doesn't exist, create a new WaterLog with this data.
     */
    create: XOR<WaterLogCreateInput, WaterLogUncheckedCreateInput>
    /**
     * In case the WaterLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WaterLogUpdateInput, WaterLogUncheckedUpdateInput>
  }

  /**
   * WaterLog delete
   */
  export type WaterLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter which WaterLog to delete.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog deleteMany
   */
  export type WaterLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterLogs to delete
     */
    where?: WaterLogWhereInput
    /**
     * Limit how many WaterLogs to delete.
     */
    limit?: number
  }

  /**
   * WaterLog without action
   */
  export type WaterLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterLog
     */
    omit?: WaterLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
  }


  /**
   * Model LiftLog
   */

  export type AggregateLiftLog = {
    _count: LiftLogCountAggregateOutputType | null
    _avg: LiftLogAvgAggregateOutputType | null
    _sum: LiftLogSumAggregateOutputType | null
    _min: LiftLogMinAggregateOutputType | null
    _max: LiftLogMaxAggregateOutputType | null
  }

  export type LiftLogAvgAggregateOutputType = {
    weightKg: number | null
    sets: number | null
    reps: number | null
  }

  export type LiftLogSumAggregateOutputType = {
    weightKg: number | null
    sets: number | null
    reps: number | null
  }

  export type LiftLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    exercise: string | null
    weightKg: number | null
    sets: number | null
    reps: number | null
    notes: string | null
    date: Date | null
    createdAt: Date | null
  }

  export type LiftLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    exercise: string | null
    weightKg: number | null
    sets: number | null
    reps: number | null
    notes: string | null
    date: Date | null
    createdAt: Date | null
  }

  export type LiftLogCountAggregateOutputType = {
    id: number
    userId: number
    exercise: number
    weightKg: number
    sets: number
    reps: number
    notes: number
    date: number
    createdAt: number
    _all: number
  }


  export type LiftLogAvgAggregateInputType = {
    weightKg?: true
    sets?: true
    reps?: true
  }

  export type LiftLogSumAggregateInputType = {
    weightKg?: true
    sets?: true
    reps?: true
  }

  export type LiftLogMinAggregateInputType = {
    id?: true
    userId?: true
    exercise?: true
    weightKg?: true
    sets?: true
    reps?: true
    notes?: true
    date?: true
    createdAt?: true
  }

  export type LiftLogMaxAggregateInputType = {
    id?: true
    userId?: true
    exercise?: true
    weightKg?: true
    sets?: true
    reps?: true
    notes?: true
    date?: true
    createdAt?: true
  }

  export type LiftLogCountAggregateInputType = {
    id?: true
    userId?: true
    exercise?: true
    weightKg?: true
    sets?: true
    reps?: true
    notes?: true
    date?: true
    createdAt?: true
    _all?: true
  }

  export type LiftLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiftLog to aggregate.
     */
    where?: LiftLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiftLogs to fetch.
     */
    orderBy?: LiftLogOrderByWithRelationInput | LiftLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiftLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiftLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiftLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiftLogs
    **/
    _count?: true | LiftLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiftLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiftLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiftLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiftLogMaxAggregateInputType
  }

  export type GetLiftLogAggregateType<T extends LiftLogAggregateArgs> = {
        [P in keyof T & keyof AggregateLiftLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiftLog[P]>
      : GetScalarType<T[P], AggregateLiftLog[P]>
  }




  export type LiftLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiftLogWhereInput
    orderBy?: LiftLogOrderByWithAggregationInput | LiftLogOrderByWithAggregationInput[]
    by: LiftLogScalarFieldEnum[] | LiftLogScalarFieldEnum
    having?: LiftLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiftLogCountAggregateInputType | true
    _avg?: LiftLogAvgAggregateInputType
    _sum?: LiftLogSumAggregateInputType
    _min?: LiftLogMinAggregateInputType
    _max?: LiftLogMaxAggregateInputType
  }

  export type LiftLogGroupByOutputType = {
    id: string
    userId: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes: string | null
    date: Date
    createdAt: Date
    _count: LiftLogCountAggregateOutputType | null
    _avg: LiftLogAvgAggregateOutputType | null
    _sum: LiftLogSumAggregateOutputType | null
    _min: LiftLogMinAggregateOutputType | null
    _max: LiftLogMaxAggregateOutputType | null
  }

  type GetLiftLogGroupByPayload<T extends LiftLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiftLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiftLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiftLogGroupByOutputType[P]>
            : GetScalarType<T[P], LiftLogGroupByOutputType[P]>
        }
      >
    >


  export type LiftLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exercise?: boolean
    weightKg?: boolean
    sets?: boolean
    reps?: boolean
    notes?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liftLog"]>

  export type LiftLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exercise?: boolean
    weightKg?: boolean
    sets?: boolean
    reps?: boolean
    notes?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liftLog"]>

  export type LiftLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    exercise?: boolean
    weightKg?: boolean
    sets?: boolean
    reps?: boolean
    notes?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liftLog"]>

  export type LiftLogSelectScalar = {
    id?: boolean
    userId?: boolean
    exercise?: boolean
    weightKg?: boolean
    sets?: boolean
    reps?: boolean
    notes?: boolean
    date?: boolean
    createdAt?: boolean
  }

  export type LiftLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "exercise" | "weightKg" | "sets" | "reps" | "notes" | "date" | "createdAt", ExtArgs["result"]["liftLog"]>
  export type LiftLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LiftLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LiftLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LiftLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiftLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      exercise: string
      weightKg: number
      sets: number
      reps: number
      notes: string | null
      date: Date
      createdAt: Date
    }, ExtArgs["result"]["liftLog"]>
    composites: {}
  }

  type LiftLogGetPayload<S extends boolean | null | undefined | LiftLogDefaultArgs> = $Result.GetResult<Prisma.$LiftLogPayload, S>

  type LiftLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiftLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiftLogCountAggregateInputType | true
    }

  export interface LiftLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiftLog'], meta: { name: 'LiftLog' } }
    /**
     * Find zero or one LiftLog that matches the filter.
     * @param {LiftLogFindUniqueArgs} args - Arguments to find a LiftLog
     * @example
     * // Get one LiftLog
     * const liftLog = await prisma.liftLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiftLogFindUniqueArgs>(args: SelectSubset<T, LiftLogFindUniqueArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiftLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiftLogFindUniqueOrThrowArgs} args - Arguments to find a LiftLog
     * @example
     * // Get one LiftLog
     * const liftLog = await prisma.liftLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiftLogFindUniqueOrThrowArgs>(args: SelectSubset<T, LiftLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiftLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogFindFirstArgs} args - Arguments to find a LiftLog
     * @example
     * // Get one LiftLog
     * const liftLog = await prisma.liftLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiftLogFindFirstArgs>(args?: SelectSubset<T, LiftLogFindFirstArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiftLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogFindFirstOrThrowArgs} args - Arguments to find a LiftLog
     * @example
     * // Get one LiftLog
     * const liftLog = await prisma.liftLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiftLogFindFirstOrThrowArgs>(args?: SelectSubset<T, LiftLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiftLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiftLogs
     * const liftLogs = await prisma.liftLog.findMany()
     * 
     * // Get first 10 LiftLogs
     * const liftLogs = await prisma.liftLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liftLogWithIdOnly = await prisma.liftLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiftLogFindManyArgs>(args?: SelectSubset<T, LiftLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiftLog.
     * @param {LiftLogCreateArgs} args - Arguments to create a LiftLog.
     * @example
     * // Create one LiftLog
     * const LiftLog = await prisma.liftLog.create({
     *   data: {
     *     // ... data to create a LiftLog
     *   }
     * })
     * 
     */
    create<T extends LiftLogCreateArgs>(args: SelectSubset<T, LiftLogCreateArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiftLogs.
     * @param {LiftLogCreateManyArgs} args - Arguments to create many LiftLogs.
     * @example
     * // Create many LiftLogs
     * const liftLog = await prisma.liftLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiftLogCreateManyArgs>(args?: SelectSubset<T, LiftLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiftLogs and returns the data saved in the database.
     * @param {LiftLogCreateManyAndReturnArgs} args - Arguments to create many LiftLogs.
     * @example
     * // Create many LiftLogs
     * const liftLog = await prisma.liftLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiftLogs and only return the `id`
     * const liftLogWithIdOnly = await prisma.liftLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiftLogCreateManyAndReturnArgs>(args?: SelectSubset<T, LiftLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiftLog.
     * @param {LiftLogDeleteArgs} args - Arguments to delete one LiftLog.
     * @example
     * // Delete one LiftLog
     * const LiftLog = await prisma.liftLog.delete({
     *   where: {
     *     // ... filter to delete one LiftLog
     *   }
     * })
     * 
     */
    delete<T extends LiftLogDeleteArgs>(args: SelectSubset<T, LiftLogDeleteArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiftLog.
     * @param {LiftLogUpdateArgs} args - Arguments to update one LiftLog.
     * @example
     * // Update one LiftLog
     * const liftLog = await prisma.liftLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiftLogUpdateArgs>(args: SelectSubset<T, LiftLogUpdateArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiftLogs.
     * @param {LiftLogDeleteManyArgs} args - Arguments to filter LiftLogs to delete.
     * @example
     * // Delete a few LiftLogs
     * const { count } = await prisma.liftLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiftLogDeleteManyArgs>(args?: SelectSubset<T, LiftLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiftLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiftLogs
     * const liftLog = await prisma.liftLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiftLogUpdateManyArgs>(args: SelectSubset<T, LiftLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiftLogs and returns the data updated in the database.
     * @param {LiftLogUpdateManyAndReturnArgs} args - Arguments to update many LiftLogs.
     * @example
     * // Update many LiftLogs
     * const liftLog = await prisma.liftLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiftLogs and only return the `id`
     * const liftLogWithIdOnly = await prisma.liftLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiftLogUpdateManyAndReturnArgs>(args: SelectSubset<T, LiftLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiftLog.
     * @param {LiftLogUpsertArgs} args - Arguments to update or create a LiftLog.
     * @example
     * // Update or create a LiftLog
     * const liftLog = await prisma.liftLog.upsert({
     *   create: {
     *     // ... data to create a LiftLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiftLog we want to update
     *   }
     * })
     */
    upsert<T extends LiftLogUpsertArgs>(args: SelectSubset<T, LiftLogUpsertArgs<ExtArgs>>): Prisma__LiftLogClient<$Result.GetResult<Prisma.$LiftLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiftLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogCountArgs} args - Arguments to filter LiftLogs to count.
     * @example
     * // Count the number of LiftLogs
     * const count = await prisma.liftLog.count({
     *   where: {
     *     // ... the filter for the LiftLogs we want to count
     *   }
     * })
    **/
    count<T extends LiftLogCountArgs>(
      args?: Subset<T, LiftLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiftLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiftLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiftLogAggregateArgs>(args: Subset<T, LiftLogAggregateArgs>): Prisma.PrismaPromise<GetLiftLogAggregateType<T>>

    /**
     * Group by LiftLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiftLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiftLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiftLogGroupByArgs['orderBy'] }
        : { orderBy?: LiftLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiftLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiftLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiftLog model
   */
  readonly fields: LiftLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiftLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiftLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiftLog model
   */
  interface LiftLogFieldRefs {
    readonly id: FieldRef<"LiftLog", 'String'>
    readonly userId: FieldRef<"LiftLog", 'String'>
    readonly exercise: FieldRef<"LiftLog", 'String'>
    readonly weightKg: FieldRef<"LiftLog", 'Float'>
    readonly sets: FieldRef<"LiftLog", 'Int'>
    readonly reps: FieldRef<"LiftLog", 'Int'>
    readonly notes: FieldRef<"LiftLog", 'String'>
    readonly date: FieldRef<"LiftLog", 'DateTime'>
    readonly createdAt: FieldRef<"LiftLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LiftLog findUnique
   */
  export type LiftLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter, which LiftLog to fetch.
     */
    where: LiftLogWhereUniqueInput
  }

  /**
   * LiftLog findUniqueOrThrow
   */
  export type LiftLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter, which LiftLog to fetch.
     */
    where: LiftLogWhereUniqueInput
  }

  /**
   * LiftLog findFirst
   */
  export type LiftLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter, which LiftLog to fetch.
     */
    where?: LiftLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiftLogs to fetch.
     */
    orderBy?: LiftLogOrderByWithRelationInput | LiftLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiftLogs.
     */
    cursor?: LiftLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiftLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiftLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiftLogs.
     */
    distinct?: LiftLogScalarFieldEnum | LiftLogScalarFieldEnum[]
  }

  /**
   * LiftLog findFirstOrThrow
   */
  export type LiftLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter, which LiftLog to fetch.
     */
    where?: LiftLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiftLogs to fetch.
     */
    orderBy?: LiftLogOrderByWithRelationInput | LiftLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiftLogs.
     */
    cursor?: LiftLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiftLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiftLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiftLogs.
     */
    distinct?: LiftLogScalarFieldEnum | LiftLogScalarFieldEnum[]
  }

  /**
   * LiftLog findMany
   */
  export type LiftLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter, which LiftLogs to fetch.
     */
    where?: LiftLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiftLogs to fetch.
     */
    orderBy?: LiftLogOrderByWithRelationInput | LiftLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiftLogs.
     */
    cursor?: LiftLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiftLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiftLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiftLogs.
     */
    distinct?: LiftLogScalarFieldEnum | LiftLogScalarFieldEnum[]
  }

  /**
   * LiftLog create
   */
  export type LiftLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * The data needed to create a LiftLog.
     */
    data: XOR<LiftLogCreateInput, LiftLogUncheckedCreateInput>
  }

  /**
   * LiftLog createMany
   */
  export type LiftLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiftLogs.
     */
    data: LiftLogCreateManyInput | LiftLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiftLog createManyAndReturn
   */
  export type LiftLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * The data used to create many LiftLogs.
     */
    data: LiftLogCreateManyInput | LiftLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiftLog update
   */
  export type LiftLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * The data needed to update a LiftLog.
     */
    data: XOR<LiftLogUpdateInput, LiftLogUncheckedUpdateInput>
    /**
     * Choose, which LiftLog to update.
     */
    where: LiftLogWhereUniqueInput
  }

  /**
   * LiftLog updateMany
   */
  export type LiftLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiftLogs.
     */
    data: XOR<LiftLogUpdateManyMutationInput, LiftLogUncheckedUpdateManyInput>
    /**
     * Filter which LiftLogs to update
     */
    where?: LiftLogWhereInput
    /**
     * Limit how many LiftLogs to update.
     */
    limit?: number
  }

  /**
   * LiftLog updateManyAndReturn
   */
  export type LiftLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * The data used to update LiftLogs.
     */
    data: XOR<LiftLogUpdateManyMutationInput, LiftLogUncheckedUpdateManyInput>
    /**
     * Filter which LiftLogs to update
     */
    where?: LiftLogWhereInput
    /**
     * Limit how many LiftLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiftLog upsert
   */
  export type LiftLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * The filter to search for the LiftLog to update in case it exists.
     */
    where: LiftLogWhereUniqueInput
    /**
     * In case the LiftLog found by the `where` argument doesn't exist, create a new LiftLog with this data.
     */
    create: XOR<LiftLogCreateInput, LiftLogUncheckedCreateInput>
    /**
     * In case the LiftLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiftLogUpdateInput, LiftLogUncheckedUpdateInput>
  }

  /**
   * LiftLog delete
   */
  export type LiftLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
    /**
     * Filter which LiftLog to delete.
     */
    where: LiftLogWhereUniqueInput
  }

  /**
   * LiftLog deleteMany
   */
  export type LiftLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiftLogs to delete
     */
    where?: LiftLogWhereInput
    /**
     * Limit how many LiftLogs to delete.
     */
    limit?: number
  }

  /**
   * LiftLog without action
   */
  export type LiftLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiftLog
     */
    select?: LiftLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiftLog
     */
    omit?: LiftLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiftLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt',
    onboardingComplete: 'onboardingComplete',
    heightCm: 'heightCm',
    startingWeightKg: 'startingWeightKg',
    age: 'age',
    sex: 'sex',
    activityLevel: 'activityLevel',
    primaryGoal: 'primaryGoal',
    fitnessExperience: 'fitnessExperience',
    dietaryPreference: 'dietaryPreference',
    equipment: 'equipment',
    calGoal: 'calGoal',
    protGoal: 'protGoal',
    carbGoal: 'carbGoal',
    fatGoal: 'fatGoal',
    stepGoal: 'stepGoal',
    weightGoal: 'weightGoal'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    mealPlan: 'mealPlan',
    workoutPlan: 'workoutPlan',
    summary: 'summary',
    generatedAt: 'generatedAt',
    updatedAt: 'updatedAt'
  };

  export type UserPlanScalarFieldEnum = (typeof UserPlanScalarFieldEnum)[keyof typeof UserPlanScalarFieldEnum]


  export const FoodCacheScalarFieldEnum: {
    id: 'id',
    query: 'query',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FoodCacheScalarFieldEnum = (typeof FoodCacheScalarFieldEnum)[keyof typeof FoodCacheScalarFieldEnum]


  export const FoodLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    qty: 'qty',
    cal: 'cal',
    prot: 'prot',
    carb: 'carb',
    fat: 'fat',
    mealType: 'mealType',
    date: 'date'
  };

  export type FoodLogScalarFieldEnum = (typeof FoodLogScalarFieldEnum)[keyof typeof FoodLogScalarFieldEnum]


  export const StepLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    count: 'count',
    date: 'date'
  };

  export type StepLogScalarFieldEnum = (typeof StepLogScalarFieldEnum)[keyof typeof StepLogScalarFieldEnum]


  export const FavoriteFoodScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    cal: 'cal',
    prot: 'prot',
    carb: 'carb',
    fat: 'fat',
    createdAt: 'createdAt'
  };

  export type FavoriteFoodScalarFieldEnum = (typeof FavoriteFoodScalarFieldEnum)[keyof typeof FavoriteFoodScalarFieldEnum]


  export const WeightLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    weight: 'weight',
    date: 'date'
  };

  export type WeightLogScalarFieldEnum = (typeof WeightLogScalarFieldEnum)[keyof typeof WeightLogScalarFieldEnum]


  export const WaterLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    ml: 'ml',
    date: 'date'
  };

  export type WaterLogScalarFieldEnum = (typeof WaterLogScalarFieldEnum)[keyof typeof WaterLogScalarFieldEnum]


  export const LiftLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    exercise: 'exercise',
    weightKg: 'weightKg',
    sets: 'sets',
    reps: 'reps',
    notes: 'notes',
    date: 'date',
    createdAt: 'createdAt'
  };

  export type LiftLogScalarFieldEnum = (typeof LiftLogScalarFieldEnum)[keyof typeof LiftLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    onboardingComplete?: BoolFilter<"User"> | boolean
    heightCm?: FloatNullableFilter<"User"> | number | null
    startingWeightKg?: FloatNullableFilter<"User"> | number | null
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    primaryGoal?: StringNullableFilter<"User"> | string | null
    fitnessExperience?: StringNullableFilter<"User"> | string | null
    dietaryPreference?: StringNullableFilter<"User"> | string | null
    equipment?: StringNullableFilter<"User"> | string | null
    calGoal?: IntFilter<"User"> | number
    protGoal?: IntFilter<"User"> | number
    carbGoal?: IntFilter<"User"> | number
    fatGoal?: IntFilter<"User"> | number
    stepGoal?: IntFilter<"User"> | number
    weightGoal?: FloatNullableFilter<"User"> | number | null
    logs?: FoodLogListRelationFilter
    steps?: StepLogListRelationFilter
    favorites?: FavoriteFoodListRelationFilter
    weights?: WeightLogListRelationFilter
    plan?: XOR<UserPlanNullableScalarRelationFilter, UserPlanWhereInput> | null
    liftLogs?: LiftLogListRelationFilter
    waters?: WaterLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    onboardingComplete?: SortOrder
    heightCm?: SortOrderInput | SortOrder
    startingWeightKg?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    primaryGoal?: SortOrderInput | SortOrder
    fitnessExperience?: SortOrderInput | SortOrder
    dietaryPreference?: SortOrderInput | SortOrder
    equipment?: SortOrderInput | SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrderInput | SortOrder
    logs?: FoodLogOrderByRelationAggregateInput
    steps?: StepLogOrderByRelationAggregateInput
    favorites?: FavoriteFoodOrderByRelationAggregateInput
    weights?: WeightLogOrderByRelationAggregateInput
    plan?: UserPlanOrderByWithRelationInput
    liftLogs?: LiftLogOrderByRelationAggregateInput
    waters?: WaterLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    onboardingComplete?: BoolFilter<"User"> | boolean
    heightCm?: FloatNullableFilter<"User"> | number | null
    startingWeightKg?: FloatNullableFilter<"User"> | number | null
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    primaryGoal?: StringNullableFilter<"User"> | string | null
    fitnessExperience?: StringNullableFilter<"User"> | string | null
    dietaryPreference?: StringNullableFilter<"User"> | string | null
    equipment?: StringNullableFilter<"User"> | string | null
    calGoal?: IntFilter<"User"> | number
    protGoal?: IntFilter<"User"> | number
    carbGoal?: IntFilter<"User"> | number
    fatGoal?: IntFilter<"User"> | number
    stepGoal?: IntFilter<"User"> | number
    weightGoal?: FloatNullableFilter<"User"> | number | null
    logs?: FoodLogListRelationFilter
    steps?: StepLogListRelationFilter
    favorites?: FavoriteFoodListRelationFilter
    weights?: WeightLogListRelationFilter
    plan?: XOR<UserPlanNullableScalarRelationFilter, UserPlanWhereInput> | null
    liftLogs?: LiftLogListRelationFilter
    waters?: WaterLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    onboardingComplete?: SortOrder
    heightCm?: SortOrderInput | SortOrder
    startingWeightKg?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    primaryGoal?: SortOrderInput | SortOrder
    fitnessExperience?: SortOrderInput | SortOrder
    dietaryPreference?: SortOrderInput | SortOrder
    equipment?: SortOrderInput | SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    onboardingComplete?: BoolWithAggregatesFilter<"User"> | boolean
    heightCm?: FloatNullableWithAggregatesFilter<"User"> | number | null
    startingWeightKg?: FloatNullableWithAggregatesFilter<"User"> | number | null
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    sex?: StringNullableWithAggregatesFilter<"User"> | string | null
    activityLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    primaryGoal?: StringNullableWithAggregatesFilter<"User"> | string | null
    fitnessExperience?: StringNullableWithAggregatesFilter<"User"> | string | null
    dietaryPreference?: StringNullableWithAggregatesFilter<"User"> | string | null
    equipment?: StringNullableWithAggregatesFilter<"User"> | string | null
    calGoal?: IntWithAggregatesFilter<"User"> | number
    protGoal?: IntWithAggregatesFilter<"User"> | number
    carbGoal?: IntWithAggregatesFilter<"User"> | number
    fatGoal?: IntWithAggregatesFilter<"User"> | number
    stepGoal?: IntWithAggregatesFilter<"User"> | number
    weightGoal?: FloatNullableWithAggregatesFilter<"User"> | number | null
  }

  export type UserPlanWhereInput = {
    AND?: UserPlanWhereInput | UserPlanWhereInput[]
    OR?: UserPlanWhereInput[]
    NOT?: UserPlanWhereInput | UserPlanWhereInput[]
    id?: StringFilter<"UserPlan"> | string
    userId?: StringFilter<"UserPlan"> | string
    mealPlan?: StringFilter<"UserPlan"> | string
    workoutPlan?: StringFilter<"UserPlan"> | string
    summary?: StringFilter<"UserPlan"> | string
    generatedAt?: DateTimeFilter<"UserPlan"> | Date | string
    updatedAt?: DateTimeFilter<"UserPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    mealPlan?: SortOrder
    workoutPlan?: SortOrder
    summary?: SortOrder
    generatedAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserPlanWhereInput | UserPlanWhereInput[]
    OR?: UserPlanWhereInput[]
    NOT?: UserPlanWhereInput | UserPlanWhereInput[]
    mealPlan?: StringFilter<"UserPlan"> | string
    workoutPlan?: StringFilter<"UserPlan"> | string
    summary?: StringFilter<"UserPlan"> | string
    generatedAt?: DateTimeFilter<"UserPlan"> | Date | string
    updatedAt?: DateTimeFilter<"UserPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    mealPlan?: SortOrder
    workoutPlan?: SortOrder
    summary?: SortOrder
    generatedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserPlanCountOrderByAggregateInput
    _max?: UserPlanMaxOrderByAggregateInput
    _min?: UserPlanMinOrderByAggregateInput
  }

  export type UserPlanScalarWhereWithAggregatesInput = {
    AND?: UserPlanScalarWhereWithAggregatesInput | UserPlanScalarWhereWithAggregatesInput[]
    OR?: UserPlanScalarWhereWithAggregatesInput[]
    NOT?: UserPlanScalarWhereWithAggregatesInput | UserPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserPlan"> | string
    userId?: StringWithAggregatesFilter<"UserPlan"> | string
    mealPlan?: StringWithAggregatesFilter<"UserPlan"> | string
    workoutPlan?: StringWithAggregatesFilter<"UserPlan"> | string
    summary?: StringWithAggregatesFilter<"UserPlan"> | string
    generatedAt?: DateTimeWithAggregatesFilter<"UserPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserPlan"> | Date | string
  }

  export type FoodCacheWhereInput = {
    AND?: FoodCacheWhereInput | FoodCacheWhereInput[]
    OR?: FoodCacheWhereInput[]
    NOT?: FoodCacheWhereInput | FoodCacheWhereInput[]
    id?: StringFilter<"FoodCache"> | string
    query?: StringFilter<"FoodCache"> | string
    data?: StringFilter<"FoodCache"> | string
    createdAt?: DateTimeFilter<"FoodCache"> | Date | string
    updatedAt?: DateTimeFilter<"FoodCache"> | Date | string
  }

  export type FoodCacheOrderByWithRelationInput = {
    id?: SortOrder
    query?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    query?: string
    AND?: FoodCacheWhereInput | FoodCacheWhereInput[]
    OR?: FoodCacheWhereInput[]
    NOT?: FoodCacheWhereInput | FoodCacheWhereInput[]
    data?: StringFilter<"FoodCache"> | string
    createdAt?: DateTimeFilter<"FoodCache"> | Date | string
    updatedAt?: DateTimeFilter<"FoodCache"> | Date | string
  }, "id" | "query">

  export type FoodCacheOrderByWithAggregationInput = {
    id?: SortOrder
    query?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoodCacheCountOrderByAggregateInput
    _max?: FoodCacheMaxOrderByAggregateInput
    _min?: FoodCacheMinOrderByAggregateInput
  }

  export type FoodCacheScalarWhereWithAggregatesInput = {
    AND?: FoodCacheScalarWhereWithAggregatesInput | FoodCacheScalarWhereWithAggregatesInput[]
    OR?: FoodCacheScalarWhereWithAggregatesInput[]
    NOT?: FoodCacheScalarWhereWithAggregatesInput | FoodCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FoodCache"> | string
    query?: StringWithAggregatesFilter<"FoodCache"> | string
    data?: StringWithAggregatesFilter<"FoodCache"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FoodCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FoodCache"> | Date | string
  }

  export type FoodLogWhereInput = {
    AND?: FoodLogWhereInput | FoodLogWhereInput[]
    OR?: FoodLogWhereInput[]
    NOT?: FoodLogWhereInput | FoodLogWhereInput[]
    id?: StringFilter<"FoodLog"> | string
    userId?: StringFilter<"FoodLog"> | string
    name?: StringFilter<"FoodLog"> | string
    qty?: FloatFilter<"FoodLog"> | number
    cal?: FloatFilter<"FoodLog"> | number
    prot?: FloatFilter<"FoodLog"> | number
    carb?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    mealType?: StringFilter<"FoodLog"> | string
    date?: DateTimeFilter<"FoodLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FoodLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    date?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FoodLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FoodLogWhereInput | FoodLogWhereInput[]
    OR?: FoodLogWhereInput[]
    NOT?: FoodLogWhereInput | FoodLogWhereInput[]
    userId?: StringFilter<"FoodLog"> | string
    name?: StringFilter<"FoodLog"> | string
    qty?: FloatFilter<"FoodLog"> | number
    cal?: FloatFilter<"FoodLog"> | number
    prot?: FloatFilter<"FoodLog"> | number
    carb?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    mealType?: StringFilter<"FoodLog"> | string
    date?: DateTimeFilter<"FoodLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FoodLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    date?: SortOrder
    _count?: FoodLogCountOrderByAggregateInput
    _avg?: FoodLogAvgOrderByAggregateInput
    _max?: FoodLogMaxOrderByAggregateInput
    _min?: FoodLogMinOrderByAggregateInput
    _sum?: FoodLogSumOrderByAggregateInput
  }

  export type FoodLogScalarWhereWithAggregatesInput = {
    AND?: FoodLogScalarWhereWithAggregatesInput | FoodLogScalarWhereWithAggregatesInput[]
    OR?: FoodLogScalarWhereWithAggregatesInput[]
    NOT?: FoodLogScalarWhereWithAggregatesInput | FoodLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FoodLog"> | string
    userId?: StringWithAggregatesFilter<"FoodLog"> | string
    name?: StringWithAggregatesFilter<"FoodLog"> | string
    qty?: FloatWithAggregatesFilter<"FoodLog"> | number
    cal?: FloatWithAggregatesFilter<"FoodLog"> | number
    prot?: FloatWithAggregatesFilter<"FoodLog"> | number
    carb?: FloatWithAggregatesFilter<"FoodLog"> | number
    fat?: FloatWithAggregatesFilter<"FoodLog"> | number
    mealType?: StringWithAggregatesFilter<"FoodLog"> | string
    date?: DateTimeWithAggregatesFilter<"FoodLog"> | Date | string
  }

  export type StepLogWhereInput = {
    AND?: StepLogWhereInput | StepLogWhereInput[]
    OR?: StepLogWhereInput[]
    NOT?: StepLogWhereInput | StepLogWhereInput[]
    id?: StringFilter<"StepLog"> | string
    userId?: StringFilter<"StepLog"> | string
    count?: IntFilter<"StepLog"> | number
    date?: DateTimeFilter<"StepLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StepLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    count?: SortOrder
    date?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type StepLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: StepLogUserIdDateCompoundUniqueInput
    AND?: StepLogWhereInput | StepLogWhereInput[]
    OR?: StepLogWhereInput[]
    NOT?: StepLogWhereInput | StepLogWhereInput[]
    userId?: StringFilter<"StepLog"> | string
    count?: IntFilter<"StepLog"> | number
    date?: DateTimeFilter<"StepLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type StepLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    count?: SortOrder
    date?: SortOrder
    _count?: StepLogCountOrderByAggregateInput
    _avg?: StepLogAvgOrderByAggregateInput
    _max?: StepLogMaxOrderByAggregateInput
    _min?: StepLogMinOrderByAggregateInput
    _sum?: StepLogSumOrderByAggregateInput
  }

  export type StepLogScalarWhereWithAggregatesInput = {
    AND?: StepLogScalarWhereWithAggregatesInput | StepLogScalarWhereWithAggregatesInput[]
    OR?: StepLogScalarWhereWithAggregatesInput[]
    NOT?: StepLogScalarWhereWithAggregatesInput | StepLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StepLog"> | string
    userId?: StringWithAggregatesFilter<"StepLog"> | string
    count?: IntWithAggregatesFilter<"StepLog"> | number
    date?: DateTimeWithAggregatesFilter<"StepLog"> | Date | string
  }

  export type FavoriteFoodWhereInput = {
    AND?: FavoriteFoodWhereInput | FavoriteFoodWhereInput[]
    OR?: FavoriteFoodWhereInput[]
    NOT?: FavoriteFoodWhereInput | FavoriteFoodWhereInput[]
    id?: StringFilter<"FavoriteFood"> | string
    userId?: StringFilter<"FavoriteFood"> | string
    name?: StringFilter<"FavoriteFood"> | string
    cal?: FloatFilter<"FavoriteFood"> | number
    prot?: FloatFilter<"FavoriteFood"> | number
    carb?: FloatFilter<"FavoriteFood"> | number
    fat?: FloatFilter<"FavoriteFood"> | number
    createdAt?: DateTimeFilter<"FavoriteFood"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FavoriteFoodOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FavoriteFoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: FavoriteFoodUserIdNameCompoundUniqueInput
    AND?: FavoriteFoodWhereInput | FavoriteFoodWhereInput[]
    OR?: FavoriteFoodWhereInput[]
    NOT?: FavoriteFoodWhereInput | FavoriteFoodWhereInput[]
    userId?: StringFilter<"FavoriteFood"> | string
    name?: StringFilter<"FavoriteFood"> | string
    cal?: FloatFilter<"FavoriteFood"> | number
    prot?: FloatFilter<"FavoriteFood"> | number
    carb?: FloatFilter<"FavoriteFood"> | number
    fat?: FloatFilter<"FavoriteFood"> | number
    createdAt?: DateTimeFilter<"FavoriteFood"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_name">

  export type FavoriteFoodOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteFoodCountOrderByAggregateInput
    _avg?: FavoriteFoodAvgOrderByAggregateInput
    _max?: FavoriteFoodMaxOrderByAggregateInput
    _min?: FavoriteFoodMinOrderByAggregateInput
    _sum?: FavoriteFoodSumOrderByAggregateInput
  }

  export type FavoriteFoodScalarWhereWithAggregatesInput = {
    AND?: FavoriteFoodScalarWhereWithAggregatesInput | FavoriteFoodScalarWhereWithAggregatesInput[]
    OR?: FavoriteFoodScalarWhereWithAggregatesInput[]
    NOT?: FavoriteFoodScalarWhereWithAggregatesInput | FavoriteFoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FavoriteFood"> | string
    userId?: StringWithAggregatesFilter<"FavoriteFood"> | string
    name?: StringWithAggregatesFilter<"FavoriteFood"> | string
    cal?: FloatWithAggregatesFilter<"FavoriteFood"> | number
    prot?: FloatWithAggregatesFilter<"FavoriteFood"> | number
    carb?: FloatWithAggregatesFilter<"FavoriteFood"> | number
    fat?: FloatWithAggregatesFilter<"FavoriteFood"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FavoriteFood"> | Date | string
  }

  export type WeightLogWhereInput = {
    AND?: WeightLogWhereInput | WeightLogWhereInput[]
    OR?: WeightLogWhereInput[]
    NOT?: WeightLogWhereInput | WeightLogWhereInput[]
    id?: StringFilter<"WeightLog"> | string
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    date?: DateTimeFilter<"WeightLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WeightLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    date?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WeightLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: WeightLogUserIdDateCompoundUniqueInput
    AND?: WeightLogWhereInput | WeightLogWhereInput[]
    OR?: WeightLogWhereInput[]
    NOT?: WeightLogWhereInput | WeightLogWhereInput[]
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    date?: DateTimeFilter<"WeightLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type WeightLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    date?: SortOrder
    _count?: WeightLogCountOrderByAggregateInput
    _avg?: WeightLogAvgOrderByAggregateInput
    _max?: WeightLogMaxOrderByAggregateInput
    _min?: WeightLogMinOrderByAggregateInput
    _sum?: WeightLogSumOrderByAggregateInput
  }

  export type WeightLogScalarWhereWithAggregatesInput = {
    AND?: WeightLogScalarWhereWithAggregatesInput | WeightLogScalarWhereWithAggregatesInput[]
    OR?: WeightLogScalarWhereWithAggregatesInput[]
    NOT?: WeightLogScalarWhereWithAggregatesInput | WeightLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeightLog"> | string
    userId?: StringWithAggregatesFilter<"WeightLog"> | string
    weight?: FloatWithAggregatesFilter<"WeightLog"> | number
    date?: DateTimeWithAggregatesFilter<"WeightLog"> | Date | string
  }

  export type WaterLogWhereInput = {
    AND?: WaterLogWhereInput | WaterLogWhereInput[]
    OR?: WaterLogWhereInput[]
    NOT?: WaterLogWhereInput | WaterLogWhereInput[]
    id?: StringFilter<"WaterLog"> | string
    userId?: StringFilter<"WaterLog"> | string
    ml?: IntFilter<"WaterLog"> | number
    date?: DateTimeFilter<"WaterLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WaterLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    ml?: SortOrder
    date?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WaterLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: WaterLogUserIdDateCompoundUniqueInput
    AND?: WaterLogWhereInput | WaterLogWhereInput[]
    OR?: WaterLogWhereInput[]
    NOT?: WaterLogWhereInput | WaterLogWhereInput[]
    userId?: StringFilter<"WaterLog"> | string
    ml?: IntFilter<"WaterLog"> | number
    date?: DateTimeFilter<"WaterLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type WaterLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    ml?: SortOrder
    date?: SortOrder
    _count?: WaterLogCountOrderByAggregateInput
    _avg?: WaterLogAvgOrderByAggregateInput
    _max?: WaterLogMaxOrderByAggregateInput
    _min?: WaterLogMinOrderByAggregateInput
    _sum?: WaterLogSumOrderByAggregateInput
  }

  export type WaterLogScalarWhereWithAggregatesInput = {
    AND?: WaterLogScalarWhereWithAggregatesInput | WaterLogScalarWhereWithAggregatesInput[]
    OR?: WaterLogScalarWhereWithAggregatesInput[]
    NOT?: WaterLogScalarWhereWithAggregatesInput | WaterLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WaterLog"> | string
    userId?: StringWithAggregatesFilter<"WaterLog"> | string
    ml?: IntWithAggregatesFilter<"WaterLog"> | number
    date?: DateTimeWithAggregatesFilter<"WaterLog"> | Date | string
  }

  export type LiftLogWhereInput = {
    AND?: LiftLogWhereInput | LiftLogWhereInput[]
    OR?: LiftLogWhereInput[]
    NOT?: LiftLogWhereInput | LiftLogWhereInput[]
    id?: StringFilter<"LiftLog"> | string
    userId?: StringFilter<"LiftLog"> | string
    exercise?: StringFilter<"LiftLog"> | string
    weightKg?: FloatFilter<"LiftLog"> | number
    sets?: IntFilter<"LiftLog"> | number
    reps?: IntFilter<"LiftLog"> | number
    notes?: StringNullableFilter<"LiftLog"> | string | null
    date?: DateTimeFilter<"LiftLog"> | Date | string
    createdAt?: DateTimeFilter<"LiftLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LiftLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    exercise?: SortOrder
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    notes?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LiftLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LiftLogWhereInput | LiftLogWhereInput[]
    OR?: LiftLogWhereInput[]
    NOT?: LiftLogWhereInput | LiftLogWhereInput[]
    userId?: StringFilter<"LiftLog"> | string
    exercise?: StringFilter<"LiftLog"> | string
    weightKg?: FloatFilter<"LiftLog"> | number
    sets?: IntFilter<"LiftLog"> | number
    reps?: IntFilter<"LiftLog"> | number
    notes?: StringNullableFilter<"LiftLog"> | string | null
    date?: DateTimeFilter<"LiftLog"> | Date | string
    createdAt?: DateTimeFilter<"LiftLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LiftLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    exercise?: SortOrder
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    notes?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    _count?: LiftLogCountOrderByAggregateInput
    _avg?: LiftLogAvgOrderByAggregateInput
    _max?: LiftLogMaxOrderByAggregateInput
    _min?: LiftLogMinOrderByAggregateInput
    _sum?: LiftLogSumOrderByAggregateInput
  }

  export type LiftLogScalarWhereWithAggregatesInput = {
    AND?: LiftLogScalarWhereWithAggregatesInput | LiftLogScalarWhereWithAggregatesInput[]
    OR?: LiftLogScalarWhereWithAggregatesInput[]
    NOT?: LiftLogScalarWhereWithAggregatesInput | LiftLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LiftLog"> | string
    userId?: StringWithAggregatesFilter<"LiftLog"> | string
    exercise?: StringWithAggregatesFilter<"LiftLog"> | string
    weightKg?: FloatWithAggregatesFilter<"LiftLog"> | number
    sets?: IntWithAggregatesFilter<"LiftLog"> | number
    reps?: IntWithAggregatesFilter<"LiftLog"> | number
    notes?: StringNullableWithAggregatesFilter<"LiftLog"> | string | null
    date?: DateTimeWithAggregatesFilter<"LiftLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"LiftLog"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserPlanCreateInput = {
    id?: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlanInput
  }

  export type UserPlanUncheckedCreateInput = {
    id?: string
    userId: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlanNestedInput
  }

  export type UserPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPlanCreateManyInput = {
    id?: string
    userId: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodCacheCreateInput = {
    id?: string
    query: string
    data: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodCacheUncheckedCreateInput = {
    id?: string
    query: string
    data: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodCacheCreateManyInput = {
    id?: string
    query: string
    data: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogCreateInput = {
    id?: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
  }

  export type FoodLogUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
  }

  export type FoodLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
  }

  export type FoodLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogCreateManyInput = {
    id?: string
    userId: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
  }

  export type FoodLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogCreateInput = {
    id?: string
    count: number
    date?: Date | string
    user: UserCreateNestedOneWithoutStepsInput
  }

  export type StepLogUncheckedCreateInput = {
    id?: string
    userId: string
    count: number
    date?: Date | string
  }

  export type StepLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStepsNestedInput
  }

  export type StepLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogCreateManyInput = {
    id?: string
    userId: string
    count: number
    date?: Date | string
  }

  export type StepLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodCreateInput = {
    id?: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteFoodUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
  }

  export type FavoriteFoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteFoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodCreateManyInput = {
    id?: string
    userId: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
  }

  export type FavoriteFoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogCreateInput = {
    id?: string
    weight: number
    date?: Date | string
    user: UserCreateNestedOneWithoutWeightsInput
  }

  export type WeightLogUncheckedCreateInput = {
    id?: string
    userId: string
    weight: number
    date?: Date | string
  }

  export type WeightLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWeightsNestedInput
  }

  export type WeightLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogCreateManyInput = {
    id?: string
    userId: string
    weight: number
    date?: Date | string
  }

  export type WeightLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogCreateInput = {
    id?: string
    ml: number
    date?: Date | string
    user: UserCreateNestedOneWithoutWatersInput
  }

  export type WaterLogUncheckedCreateInput = {
    id?: string
    userId: string
    ml: number
    date?: Date | string
  }

  export type WaterLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatersNestedInput
  }

  export type WaterLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogCreateManyInput = {
    id?: string
    userId: string
    ml: number
    date?: Date | string
  }

  export type WaterLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogCreateInput = {
    id?: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLiftLogsInput
  }

  export type LiftLogUncheckedCreateInput = {
    id?: string
    userId: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type LiftLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLiftLogsNestedInput
  }

  export type LiftLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogCreateManyInput = {
    id?: string
    userId: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type LiftLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FoodLogListRelationFilter = {
    every?: FoodLogWhereInput
    some?: FoodLogWhereInput
    none?: FoodLogWhereInput
  }

  export type StepLogListRelationFilter = {
    every?: StepLogWhereInput
    some?: StepLogWhereInput
    none?: StepLogWhereInput
  }

  export type FavoriteFoodListRelationFilter = {
    every?: FavoriteFoodWhereInput
    some?: FavoriteFoodWhereInput
    none?: FavoriteFoodWhereInput
  }

  export type WeightLogListRelationFilter = {
    every?: WeightLogWhereInput
    some?: WeightLogWhereInput
    none?: WeightLogWhereInput
  }

  export type UserPlanNullableScalarRelationFilter = {
    is?: UserPlanWhereInput | null
    isNot?: UserPlanWhereInput | null
  }

  export type LiftLogListRelationFilter = {
    every?: LiftLogWhereInput
    some?: LiftLogWhereInput
    none?: LiftLogWhereInput
  }

  export type WaterLogListRelationFilter = {
    every?: WaterLogWhereInput
    some?: WaterLogWhereInput
    none?: WaterLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FoodLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StepLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteFoodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeightLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LiftLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WaterLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    onboardingComplete?: SortOrder
    heightCm?: SortOrder
    startingWeightKg?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    primaryGoal?: SortOrder
    fitnessExperience?: SortOrder
    dietaryPreference?: SortOrder
    equipment?: SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    heightCm?: SortOrder
    startingWeightKg?: SortOrder
    age?: SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    onboardingComplete?: SortOrder
    heightCm?: SortOrder
    startingWeightKg?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    primaryGoal?: SortOrder
    fitnessExperience?: SortOrder
    dietaryPreference?: SortOrder
    equipment?: SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    onboardingComplete?: SortOrder
    heightCm?: SortOrder
    startingWeightKg?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    primaryGoal?: SortOrder
    fitnessExperience?: SortOrder
    dietaryPreference?: SortOrder
    equipment?: SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    heightCm?: SortOrder
    startingWeightKg?: SortOrder
    age?: SortOrder
    calGoal?: SortOrder
    protGoal?: SortOrder
    carbGoal?: SortOrder
    fatGoal?: SortOrder
    stepGoal?: SortOrder
    weightGoal?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealPlan?: SortOrder
    workoutPlan?: SortOrder
    summary?: SortOrder
    generatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealPlan?: SortOrder
    workoutPlan?: SortOrder
    summary?: SortOrder
    generatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealPlan?: SortOrder
    workoutPlan?: SortOrder
    summary?: SortOrder
    generatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodCacheCountOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodCacheMinOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FoodLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    date?: SortOrder
  }

  export type FoodLogAvgOrderByAggregateInput = {
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
  }

  export type FoodLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    date?: SortOrder
  }

  export type FoodLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    date?: SortOrder
  }

  export type FoodLogSumOrderByAggregateInput = {
    qty?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StepLogUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type StepLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    count?: SortOrder
    date?: SortOrder
  }

  export type StepLogAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type StepLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    count?: SortOrder
    date?: SortOrder
  }

  export type StepLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    count?: SortOrder
    date?: SortOrder
  }

  export type StepLogSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type FavoriteFoodUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type FavoriteFoodCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteFoodAvgOrderByAggregateInput = {
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
  }

  export type FavoriteFoodMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteFoodMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteFoodSumOrderByAggregateInput = {
    cal?: SortOrder
    prot?: SortOrder
    carb?: SortOrder
    fat?: SortOrder
  }

  export type WeightLogUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type WeightLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    date?: SortOrder
  }

  export type WeightLogAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type WeightLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    date?: SortOrder
  }

  export type WeightLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    date?: SortOrder
  }

  export type WeightLogSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type WaterLogUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type WaterLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ml?: SortOrder
    date?: SortOrder
  }

  export type WaterLogAvgOrderByAggregateInput = {
    ml?: SortOrder
  }

  export type WaterLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ml?: SortOrder
    date?: SortOrder
  }

  export type WaterLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ml?: SortOrder
    date?: SortOrder
  }

  export type WaterLogSumOrderByAggregateInput = {
    ml?: SortOrder
  }

  export type LiftLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exercise?: SortOrder
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type LiftLogAvgOrderByAggregateInput = {
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
  }

  export type LiftLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exercise?: SortOrder
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type LiftLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    exercise?: SortOrder
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type LiftLogSumOrderByAggregateInput = {
    weightKg?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
  }

  export type FoodLogCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type StepLogCreateNestedManyWithoutUserInput = {
    create?: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput> | StepLogCreateWithoutUserInput[] | StepLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StepLogCreateOrConnectWithoutUserInput | StepLogCreateOrConnectWithoutUserInput[]
    createMany?: StepLogCreateManyUserInputEnvelope
    connect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
  }

  export type FavoriteFoodCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput> | FavoriteFoodCreateWithoutUserInput[] | FavoriteFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteFoodCreateOrConnectWithoutUserInput | FavoriteFoodCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteFoodCreateManyUserInputEnvelope
    connect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
  }

  export type WeightLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
  }

  export type UserPlanCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPlanCreateOrConnectWithoutUserInput
    connect?: UserPlanWhereUniqueInput
  }

  export type LiftLogCreateNestedManyWithoutUserInput = {
    create?: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput> | LiftLogCreateWithoutUserInput[] | LiftLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LiftLogCreateOrConnectWithoutUserInput | LiftLogCreateOrConnectWithoutUserInput[]
    createMany?: LiftLogCreateManyUserInputEnvelope
    connect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
  }

  export type WaterLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
  }

  export type FoodLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type StepLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput> | StepLogCreateWithoutUserInput[] | StepLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StepLogCreateOrConnectWithoutUserInput | StepLogCreateOrConnectWithoutUserInput[]
    createMany?: StepLogCreateManyUserInputEnvelope
    connect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
  }

  export type FavoriteFoodUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput> | FavoriteFoodCreateWithoutUserInput[] | FavoriteFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteFoodCreateOrConnectWithoutUserInput | FavoriteFoodCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteFoodCreateManyUserInputEnvelope
    connect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
  }

  export type WeightLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
  }

  export type UserPlanUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPlanCreateOrConnectWithoutUserInput
    connect?: UserPlanWhereUniqueInput
  }

  export type LiftLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput> | LiftLogCreateWithoutUserInput[] | LiftLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LiftLogCreateOrConnectWithoutUserInput | LiftLogCreateOrConnectWithoutUserInput[]
    createMany?: LiftLogCreateManyUserInputEnvelope
    connect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
  }

  export type WaterLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FoodLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutUserInput | FoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutUserInput | FoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutUserInput | FoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type StepLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput> | StepLogCreateWithoutUserInput[] | StepLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StepLogCreateOrConnectWithoutUserInput | StepLogCreateOrConnectWithoutUserInput[]
    upsert?: StepLogUpsertWithWhereUniqueWithoutUserInput | StepLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StepLogCreateManyUserInputEnvelope
    set?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    disconnect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    delete?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    connect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    update?: StepLogUpdateWithWhereUniqueWithoutUserInput | StepLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StepLogUpdateManyWithWhereWithoutUserInput | StepLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StepLogScalarWhereInput | StepLogScalarWhereInput[]
  }

  export type FavoriteFoodUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput> | FavoriteFoodCreateWithoutUserInput[] | FavoriteFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteFoodCreateOrConnectWithoutUserInput | FavoriteFoodCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteFoodUpsertWithWhereUniqueWithoutUserInput | FavoriteFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteFoodCreateManyUserInputEnvelope
    set?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    disconnect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    delete?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    connect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    update?: FavoriteFoodUpdateWithWhereUniqueWithoutUserInput | FavoriteFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteFoodUpdateManyWithWhereWithoutUserInput | FavoriteFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteFoodScalarWhereInput | FavoriteFoodScalarWhereInput[]
  }

  export type WeightLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    upsert?: WeightLogUpsertWithWhereUniqueWithoutUserInput | WeightLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    set?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    disconnect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    delete?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    update?: WeightLogUpdateWithWhereUniqueWithoutUserInput | WeightLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightLogUpdateManyWithWhereWithoutUserInput | WeightLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
  }

  export type UserPlanUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPlanCreateOrConnectWithoutUserInput
    upsert?: UserPlanUpsertWithoutUserInput
    disconnect?: UserPlanWhereInput | boolean
    delete?: UserPlanWhereInput | boolean
    connect?: UserPlanWhereUniqueInput
    update?: XOR<XOR<UserPlanUpdateToOneWithWhereWithoutUserInput, UserPlanUpdateWithoutUserInput>, UserPlanUncheckedUpdateWithoutUserInput>
  }

  export type LiftLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput> | LiftLogCreateWithoutUserInput[] | LiftLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LiftLogCreateOrConnectWithoutUserInput | LiftLogCreateOrConnectWithoutUserInput[]
    upsert?: LiftLogUpsertWithWhereUniqueWithoutUserInput | LiftLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LiftLogCreateManyUserInputEnvelope
    set?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    disconnect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    delete?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    connect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    update?: LiftLogUpdateWithWhereUniqueWithoutUserInput | LiftLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LiftLogUpdateManyWithWhereWithoutUserInput | LiftLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LiftLogScalarWhereInput | LiftLogScalarWhereInput[]
  }

  export type WaterLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    upsert?: WaterLogUpsertWithWhereUniqueWithoutUserInput | WaterLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    set?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    disconnect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    delete?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    update?: WaterLogUpdateWithWhereUniqueWithoutUserInput | WaterLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterLogUpdateManyWithWhereWithoutUserInput | WaterLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
  }

  export type FoodLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutUserInput | FoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutUserInput | FoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutUserInput | FoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type StepLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput> | StepLogCreateWithoutUserInput[] | StepLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StepLogCreateOrConnectWithoutUserInput | StepLogCreateOrConnectWithoutUserInput[]
    upsert?: StepLogUpsertWithWhereUniqueWithoutUserInput | StepLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StepLogCreateManyUserInputEnvelope
    set?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    disconnect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    delete?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    connect?: StepLogWhereUniqueInput | StepLogWhereUniqueInput[]
    update?: StepLogUpdateWithWhereUniqueWithoutUserInput | StepLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StepLogUpdateManyWithWhereWithoutUserInput | StepLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StepLogScalarWhereInput | StepLogScalarWhereInput[]
  }

  export type FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput> | FavoriteFoodCreateWithoutUserInput[] | FavoriteFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteFoodCreateOrConnectWithoutUserInput | FavoriteFoodCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteFoodUpsertWithWhereUniqueWithoutUserInput | FavoriteFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteFoodCreateManyUserInputEnvelope
    set?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    disconnect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    delete?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    connect?: FavoriteFoodWhereUniqueInput | FavoriteFoodWhereUniqueInput[]
    update?: FavoriteFoodUpdateWithWhereUniqueWithoutUserInput | FavoriteFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteFoodUpdateManyWithWhereWithoutUserInput | FavoriteFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteFoodScalarWhereInput | FavoriteFoodScalarWhereInput[]
  }

  export type WeightLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    upsert?: WeightLogUpsertWithWhereUniqueWithoutUserInput | WeightLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    set?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    disconnect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    delete?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    update?: WeightLogUpdateWithWhereUniqueWithoutUserInput | WeightLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightLogUpdateManyWithWhereWithoutUserInput | WeightLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
  }

  export type UserPlanUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPlanCreateOrConnectWithoutUserInput
    upsert?: UserPlanUpsertWithoutUserInput
    disconnect?: UserPlanWhereInput | boolean
    delete?: UserPlanWhereInput | boolean
    connect?: UserPlanWhereUniqueInput
    update?: XOR<XOR<UserPlanUpdateToOneWithWhereWithoutUserInput, UserPlanUpdateWithoutUserInput>, UserPlanUncheckedUpdateWithoutUserInput>
  }

  export type LiftLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput> | LiftLogCreateWithoutUserInput[] | LiftLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LiftLogCreateOrConnectWithoutUserInput | LiftLogCreateOrConnectWithoutUserInput[]
    upsert?: LiftLogUpsertWithWhereUniqueWithoutUserInput | LiftLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LiftLogCreateManyUserInputEnvelope
    set?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    disconnect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    delete?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    connect?: LiftLogWhereUniqueInput | LiftLogWhereUniqueInput[]
    update?: LiftLogUpdateWithWhereUniqueWithoutUserInput | LiftLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LiftLogUpdateManyWithWhereWithoutUserInput | LiftLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LiftLogScalarWhereInput | LiftLogScalarWhereInput[]
  }

  export type WaterLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    upsert?: WaterLogUpsertWithWhereUniqueWithoutUserInput | WaterLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    set?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    disconnect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    delete?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    update?: WaterLogUpdateWithWhereUniqueWithoutUserInput | WaterLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterLogUpdateManyWithWhereWithoutUserInput | WaterLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPlanInput = {
    create?: XOR<UserCreateWithoutPlanInput, UserUncheckedCreateWithoutPlanInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlanInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPlanNestedInput = {
    create?: XOR<UserCreateWithoutPlanInput, UserUncheckedCreateWithoutPlanInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlanInput
    upsert?: UserUpsertWithoutPlanInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlanInput, UserUpdateWithoutPlanInput>, UserUncheckedUpdateWithoutPlanInput>
  }

  export type UserCreateNestedOneWithoutLogsInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    upsert?: UserUpsertWithoutLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLogsInput, UserUpdateWithoutLogsInput>, UserUncheckedUpdateWithoutLogsInput>
  }

  export type UserCreateNestedOneWithoutStepsInput = {
    create?: XOR<UserCreateWithoutStepsInput, UserUncheckedCreateWithoutStepsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStepsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<UserCreateWithoutStepsInput, UserUncheckedCreateWithoutStepsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStepsInput
    upsert?: UserUpsertWithoutStepsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStepsInput, UserUpdateWithoutStepsInput>, UserUncheckedUpdateWithoutStepsInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutWeightsInput = {
    create?: XOR<UserCreateWithoutWeightsInput, UserUncheckedCreateWithoutWeightsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWeightsNestedInput = {
    create?: XOR<UserCreateWithoutWeightsInput, UserUncheckedCreateWithoutWeightsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightsInput
    upsert?: UserUpsertWithoutWeightsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWeightsInput, UserUpdateWithoutWeightsInput>, UserUncheckedUpdateWithoutWeightsInput>
  }

  export type UserCreateNestedOneWithoutWatersInput = {
    create?: XOR<UserCreateWithoutWatersInput, UserUncheckedCreateWithoutWatersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWatersNestedInput = {
    create?: XOR<UserCreateWithoutWatersInput, UserUncheckedCreateWithoutWatersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatersInput
    upsert?: UserUpsertWithoutWatersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatersInput, UserUpdateWithoutWatersInput>, UserUncheckedUpdateWithoutWatersInput>
  }

  export type UserCreateNestedOneWithoutLiftLogsInput = {
    create?: XOR<UserCreateWithoutLiftLogsInput, UserUncheckedCreateWithoutLiftLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLiftLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLiftLogsNestedInput = {
    create?: XOR<UserCreateWithoutLiftLogsInput, UserUncheckedCreateWithoutLiftLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLiftLogsInput
    upsert?: UserUpsertWithoutLiftLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLiftLogsInput, UserUpdateWithoutLiftLogsInput>, UserUncheckedUpdateWithoutLiftLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FoodLogCreateWithoutUserInput = {
    id?: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
  }

  export type FoodLogUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
  }

  export type FoodLogCreateOrConnectWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    create: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput>
  }

  export type FoodLogCreateManyUserInputEnvelope = {
    data: FoodLogCreateManyUserInput | FoodLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StepLogCreateWithoutUserInput = {
    id?: string
    count: number
    date?: Date | string
  }

  export type StepLogUncheckedCreateWithoutUserInput = {
    id?: string
    count: number
    date?: Date | string
  }

  export type StepLogCreateOrConnectWithoutUserInput = {
    where: StepLogWhereUniqueInput
    create: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput>
  }

  export type StepLogCreateManyUserInputEnvelope = {
    data: StepLogCreateManyUserInput | StepLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteFoodCreateWithoutUserInput = {
    id?: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
  }

  export type FavoriteFoodUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
  }

  export type FavoriteFoodCreateOrConnectWithoutUserInput = {
    where: FavoriteFoodWhereUniqueInput
    create: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput>
  }

  export type FavoriteFoodCreateManyUserInputEnvelope = {
    data: FavoriteFoodCreateManyUserInput | FavoriteFoodCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WeightLogCreateWithoutUserInput = {
    id?: string
    weight: number
    date?: Date | string
  }

  export type WeightLogUncheckedCreateWithoutUserInput = {
    id?: string
    weight: number
    date?: Date | string
  }

  export type WeightLogCreateOrConnectWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    create: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput>
  }

  export type WeightLogCreateManyUserInputEnvelope = {
    data: WeightLogCreateManyUserInput | WeightLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserPlanCreateWithoutUserInput = {
    id?: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPlanUncheckedCreateWithoutUserInput = {
    id?: string
    mealPlan: string
    workoutPlan: string
    summary: string
    generatedAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPlanCreateOrConnectWithoutUserInput = {
    where: UserPlanWhereUniqueInput
    create: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
  }

  export type LiftLogCreateWithoutUserInput = {
    id?: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type LiftLogUncheckedCreateWithoutUserInput = {
    id?: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type LiftLogCreateOrConnectWithoutUserInput = {
    where: LiftLogWhereUniqueInput
    create: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput>
  }

  export type LiftLogCreateManyUserInputEnvelope = {
    data: LiftLogCreateManyUserInput | LiftLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WaterLogCreateWithoutUserInput = {
    id?: string
    ml: number
    date?: Date | string
  }

  export type WaterLogUncheckedCreateWithoutUserInput = {
    id?: string
    ml: number
    date?: Date | string
  }

  export type WaterLogCreateOrConnectWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    create: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput>
  }

  export type WaterLogCreateManyUserInputEnvelope = {
    data: WaterLogCreateManyUserInput | WaterLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FoodLogUpsertWithWhereUniqueWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    update: XOR<FoodLogUpdateWithoutUserInput, FoodLogUncheckedUpdateWithoutUserInput>
    create: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput>
  }

  export type FoodLogUpdateWithWhereUniqueWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    data: XOR<FoodLogUpdateWithoutUserInput, FoodLogUncheckedUpdateWithoutUserInput>
  }

  export type FoodLogUpdateManyWithWhereWithoutUserInput = {
    where: FoodLogScalarWhereInput
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyWithoutUserInput>
  }

  export type FoodLogScalarWhereInput = {
    AND?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
    OR?: FoodLogScalarWhereInput[]
    NOT?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
    id?: StringFilter<"FoodLog"> | string
    userId?: StringFilter<"FoodLog"> | string
    name?: StringFilter<"FoodLog"> | string
    qty?: FloatFilter<"FoodLog"> | number
    cal?: FloatFilter<"FoodLog"> | number
    prot?: FloatFilter<"FoodLog"> | number
    carb?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    mealType?: StringFilter<"FoodLog"> | string
    date?: DateTimeFilter<"FoodLog"> | Date | string
  }

  export type StepLogUpsertWithWhereUniqueWithoutUserInput = {
    where: StepLogWhereUniqueInput
    update: XOR<StepLogUpdateWithoutUserInput, StepLogUncheckedUpdateWithoutUserInput>
    create: XOR<StepLogCreateWithoutUserInput, StepLogUncheckedCreateWithoutUserInput>
  }

  export type StepLogUpdateWithWhereUniqueWithoutUserInput = {
    where: StepLogWhereUniqueInput
    data: XOR<StepLogUpdateWithoutUserInput, StepLogUncheckedUpdateWithoutUserInput>
  }

  export type StepLogUpdateManyWithWhereWithoutUserInput = {
    where: StepLogScalarWhereInput
    data: XOR<StepLogUpdateManyMutationInput, StepLogUncheckedUpdateManyWithoutUserInput>
  }

  export type StepLogScalarWhereInput = {
    AND?: StepLogScalarWhereInput | StepLogScalarWhereInput[]
    OR?: StepLogScalarWhereInput[]
    NOT?: StepLogScalarWhereInput | StepLogScalarWhereInput[]
    id?: StringFilter<"StepLog"> | string
    userId?: StringFilter<"StepLog"> | string
    count?: IntFilter<"StepLog"> | number
    date?: DateTimeFilter<"StepLog"> | Date | string
  }

  export type FavoriteFoodUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteFoodWhereUniqueInput
    update: XOR<FavoriteFoodUpdateWithoutUserInput, FavoriteFoodUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteFoodCreateWithoutUserInput, FavoriteFoodUncheckedCreateWithoutUserInput>
  }

  export type FavoriteFoodUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteFoodWhereUniqueInput
    data: XOR<FavoriteFoodUpdateWithoutUserInput, FavoriteFoodUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteFoodUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteFoodScalarWhereInput
    data: XOR<FavoriteFoodUpdateManyMutationInput, FavoriteFoodUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteFoodScalarWhereInput = {
    AND?: FavoriteFoodScalarWhereInput | FavoriteFoodScalarWhereInput[]
    OR?: FavoriteFoodScalarWhereInput[]
    NOT?: FavoriteFoodScalarWhereInput | FavoriteFoodScalarWhereInput[]
    id?: StringFilter<"FavoriteFood"> | string
    userId?: StringFilter<"FavoriteFood"> | string
    name?: StringFilter<"FavoriteFood"> | string
    cal?: FloatFilter<"FavoriteFood"> | number
    prot?: FloatFilter<"FavoriteFood"> | number
    carb?: FloatFilter<"FavoriteFood"> | number
    fat?: FloatFilter<"FavoriteFood"> | number
    createdAt?: DateTimeFilter<"FavoriteFood"> | Date | string
  }

  export type WeightLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    update: XOR<WeightLogUpdateWithoutUserInput, WeightLogUncheckedUpdateWithoutUserInput>
    create: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput>
  }

  export type WeightLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    data: XOR<WeightLogUpdateWithoutUserInput, WeightLogUncheckedUpdateWithoutUserInput>
  }

  export type WeightLogUpdateManyWithWhereWithoutUserInput = {
    where: WeightLogScalarWhereInput
    data: XOR<WeightLogUpdateManyMutationInput, WeightLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WeightLogScalarWhereInput = {
    AND?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
    OR?: WeightLogScalarWhereInput[]
    NOT?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
    id?: StringFilter<"WeightLog"> | string
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    date?: DateTimeFilter<"WeightLog"> | Date | string
  }

  export type UserPlanUpsertWithoutUserInput = {
    update: XOR<UserPlanUpdateWithoutUserInput, UserPlanUncheckedUpdateWithoutUserInput>
    create: XOR<UserPlanCreateWithoutUserInput, UserPlanUncheckedCreateWithoutUserInput>
    where?: UserPlanWhereInput
  }

  export type UserPlanUpdateToOneWithWhereWithoutUserInput = {
    where?: UserPlanWhereInput
    data: XOR<UserPlanUpdateWithoutUserInput, UserPlanUncheckedUpdateWithoutUserInput>
  }

  export type UserPlanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPlanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlan?: StringFieldUpdateOperationsInput | string
    workoutPlan?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogUpsertWithWhereUniqueWithoutUserInput = {
    where: LiftLogWhereUniqueInput
    update: XOR<LiftLogUpdateWithoutUserInput, LiftLogUncheckedUpdateWithoutUserInput>
    create: XOR<LiftLogCreateWithoutUserInput, LiftLogUncheckedCreateWithoutUserInput>
  }

  export type LiftLogUpdateWithWhereUniqueWithoutUserInput = {
    where: LiftLogWhereUniqueInput
    data: XOR<LiftLogUpdateWithoutUserInput, LiftLogUncheckedUpdateWithoutUserInput>
  }

  export type LiftLogUpdateManyWithWhereWithoutUserInput = {
    where: LiftLogScalarWhereInput
    data: XOR<LiftLogUpdateManyMutationInput, LiftLogUncheckedUpdateManyWithoutUserInput>
  }

  export type LiftLogScalarWhereInput = {
    AND?: LiftLogScalarWhereInput | LiftLogScalarWhereInput[]
    OR?: LiftLogScalarWhereInput[]
    NOT?: LiftLogScalarWhereInput | LiftLogScalarWhereInput[]
    id?: StringFilter<"LiftLog"> | string
    userId?: StringFilter<"LiftLog"> | string
    exercise?: StringFilter<"LiftLog"> | string
    weightKg?: FloatFilter<"LiftLog"> | number
    sets?: IntFilter<"LiftLog"> | number
    reps?: IntFilter<"LiftLog"> | number
    notes?: StringNullableFilter<"LiftLog"> | string | null
    date?: DateTimeFilter<"LiftLog"> | Date | string
    createdAt?: DateTimeFilter<"LiftLog"> | Date | string
  }

  export type WaterLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    update: XOR<WaterLogUpdateWithoutUserInput, WaterLogUncheckedUpdateWithoutUserInput>
    create: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput>
  }

  export type WaterLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    data: XOR<WaterLogUpdateWithoutUserInput, WaterLogUncheckedUpdateWithoutUserInput>
  }

  export type WaterLogUpdateManyWithWhereWithoutUserInput = {
    where: WaterLogScalarWhereInput
    data: XOR<WaterLogUpdateManyMutationInput, WaterLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WaterLogScalarWhereInput = {
    AND?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
    OR?: WaterLogScalarWhereInput[]
    NOT?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
    id?: StringFilter<"WaterLog"> | string
    userId?: StringFilter<"WaterLog"> | string
    ml?: IntFilter<"WaterLog"> | number
    date?: DateTimeFilter<"WaterLog"> | Date | string
  }

  export type UserCreateWithoutPlanInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlanInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlanInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlanInput, UserUncheckedCreateWithoutPlanInput>
  }

  export type UserUpsertWithoutPlanInput = {
    update: XOR<UserUpdateWithoutPlanInput, UserUncheckedUpdateWithoutPlanInput>
    create: XOR<UserCreateWithoutPlanInput, UserUncheckedCreateWithoutPlanInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlanInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlanInput, UserUncheckedUpdateWithoutPlanInput>
  }

  export type UserUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLogsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLogsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
  }

  export type UserUpsertWithoutLogsInput = {
    update: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
  }

  export type UserUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutStepsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStepsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStepsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStepsInput, UserUncheckedCreateWithoutStepsInput>
  }

  export type UserUpsertWithoutStepsInput = {
    update: XOR<UserUpdateWithoutStepsInput, UserUncheckedUpdateWithoutStepsInput>
    create: XOR<UserCreateWithoutStepsInput, UserUncheckedCreateWithoutStepsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStepsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStepsInput, UserUncheckedUpdateWithoutStepsInput>
  }

  export type UserUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWeightsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWeightsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWeightsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWeightsInput, UserUncheckedCreateWithoutWeightsInput>
  }

  export type UserUpsertWithoutWeightsInput = {
    update: XOR<UserUpdateWithoutWeightsInput, UserUncheckedUpdateWithoutWeightsInput>
    create: XOR<UserCreateWithoutWeightsInput, UserUncheckedCreateWithoutWeightsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWeightsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWeightsInput, UserUncheckedUpdateWithoutWeightsInput>
  }

  export type UserUpdateWithoutWeightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWeightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWatersInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatersInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    liftLogs?: LiftLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatersInput, UserUncheckedCreateWithoutWatersInput>
  }

  export type UserUpsertWithoutWatersInput = {
    update: XOR<UserUpdateWithoutWatersInput, UserUncheckedUpdateWithoutWatersInput>
    create: XOR<UserCreateWithoutWatersInput, UserUncheckedCreateWithoutWatersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatersInput, UserUncheckedUpdateWithoutWatersInput>
  }

  export type UserUpdateWithoutWatersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    liftLogs?: LiftLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLiftLogsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogCreateNestedManyWithoutUserInput
    steps?: StepLogCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodCreateNestedManyWithoutUserInput
    weights?: WeightLogCreateNestedManyWithoutUserInput
    plan?: UserPlanCreateNestedOneWithoutUserInput
    waters?: WaterLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLiftLogsInput = {
    id: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    onboardingComplete?: boolean
    heightCm?: number | null
    startingWeightKg?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    primaryGoal?: string | null
    fitnessExperience?: string | null
    dietaryPreference?: string | null
    equipment?: string | null
    calGoal?: number
    protGoal?: number
    carbGoal?: number
    fatGoal?: number
    stepGoal?: number
    weightGoal?: number | null
    logs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    steps?: StepLogUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteFoodUncheckedCreateNestedManyWithoutUserInput
    weights?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    plan?: UserPlanUncheckedCreateNestedOneWithoutUserInput
    waters?: WaterLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLiftLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLiftLogsInput, UserUncheckedCreateWithoutLiftLogsInput>
  }

  export type UserUpsertWithoutLiftLogsInput = {
    update: XOR<UserUpdateWithoutLiftLogsInput, UserUncheckedUpdateWithoutLiftLogsInput>
    create: XOR<UserCreateWithoutLiftLogsInput, UserUncheckedCreateWithoutLiftLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLiftLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLiftLogsInput, UserUncheckedUpdateWithoutLiftLogsInput>
  }

  export type UserUpdateWithoutLiftLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUpdateManyWithoutUserNestedInput
    steps?: StepLogUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUpdateManyWithoutUserNestedInput
    weights?: WeightLogUpdateManyWithoutUserNestedInput
    plan?: UserPlanUpdateOneWithoutUserNestedInput
    waters?: WaterLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLiftLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingComplete?: BoolFieldUpdateOperationsInput | boolean
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    startingWeightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    primaryGoal?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessExperience?: NullableStringFieldUpdateOperationsInput | string | null
    dietaryPreference?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    calGoal?: IntFieldUpdateOperationsInput | number
    protGoal?: IntFieldUpdateOperationsInput | number
    carbGoal?: IntFieldUpdateOperationsInput | number
    fatGoal?: IntFieldUpdateOperationsInput | number
    stepGoal?: IntFieldUpdateOperationsInput | number
    weightGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    logs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    steps?: StepLogUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteFoodUncheckedUpdateManyWithoutUserNestedInput
    weights?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    plan?: UserPlanUncheckedUpdateOneWithoutUserNestedInput
    waters?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FoodLogCreateManyUserInput = {
    id?: string
    name: string
    qty: number
    cal: number
    prot: number
    carb: number
    fat: number
    mealType?: string
    date?: Date | string
  }

  export type StepLogCreateManyUserInput = {
    id?: string
    count: number
    date?: Date | string
  }

  export type FavoriteFoodCreateManyUserInput = {
    id?: string
    name: string
    cal: number
    prot: number
    carb: number
    fat: number
    createdAt?: Date | string
  }

  export type WeightLogCreateManyUserInput = {
    id?: string
    weight: number
    date?: Date | string
  }

  export type LiftLogCreateManyUserInput = {
    id?: string
    exercise: string
    weightKg: number
    sets: number
    reps: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type WaterLogCreateManyUserInput = {
    id?: string
    ml: number
    date?: Date | string
  }

  export type FoodLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qty?: FloatFieldUpdateOperationsInput | number
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteFoodUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cal?: FloatFieldUpdateOperationsInput | number
    prot?: FloatFieldUpdateOperationsInput | number
    carb?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiftLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    exercise?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    sets?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ml?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}