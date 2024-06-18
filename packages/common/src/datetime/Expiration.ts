export class Expiration {
  static getSeconds(seconds: number) {
    return seconds;
  }

  static getMinutes(minutes: number) {
    return minutes * 60;
  }

  static getHours(hours: number) {
    return hours * 3600;
  }

  static getDays(days: number) {
    return days * 86400;
  }

  static getWeeks(weeks: number) {
    return weeks * 604800;
  }
}
