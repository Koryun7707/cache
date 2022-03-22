export class UtilsService {
  constructor() {}
  static ttlDate() {
    const date = new Date();
    // add a day
    date.setDate(date.getDate() + 1);
    return date;
  }
}
