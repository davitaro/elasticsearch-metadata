import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      cloud: {
        id: 'MongoMigrationSearch:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2NDcyYzAxYzRhZGM0NzQxOTliODJiNjI0ZDg3MzYwYyRiMjZkOGQ0MTAxOTQ0MDRlOWUwNjk5YmI4NDE2YWZjZg==',
      },
      auth: {
        username: 'elastic',
        password: '4LfB25pTsJ6XCXgg40FsGcLi',
      },
    }),
  ],
  exports: [ElasticsearchModule, SearchService],
  providers: [SearchService],
})
export class SearchModule {}
