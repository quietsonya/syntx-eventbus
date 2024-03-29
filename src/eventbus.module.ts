import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import 'dotenv/config'
import { UsersEventsModule } from './users-events/users-events.module'
import { RolesEventsModule } from './roles-events/roles-events.module'
import { MongooseModule } from '@nestjs/mongoose'
import { IssuesEventsModule } from './issues-events/issues-events.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ `@${process.env.NODE_ENV}.env`, '@.env' ],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                uri: config.get('MONGODB_URI')
            }),
        }),
        UsersEventsModule,
        RolesEventsModule,
        IssuesEventsModule,
    ],
})
export class EventBusModule {}
