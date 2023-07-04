import { Controller, Get, Header, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/download')
  @Header('content-type', 'text/xlxs')
  async downloadReport(@Res() res){

    let result = await this.appService.downloadExcel()
    res.download(result)
  }
}
