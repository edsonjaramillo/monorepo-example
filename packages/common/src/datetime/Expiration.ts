export class Expiration {
  static getSeconds(seconds: number) {
    if (seconds < 0) {
      throw new Error('Seconds cannot be negative');
    }

    return seconds;
  }

  static getMinutes(minutes: number) {
    if (minutes < 0) {
      throw new Error('Minutes cannot be negative');
    }

    return minutes * 60;
  }

  static getHours(hours: number) {
    if (hours < 0) {
      throw new Error('Hours cannot be negative');
    }

    return hours * 3600;
  }

  static getDays(days: number) {
    if (days < 0) {
      throw new Error('Days cannot be negative');
    }

    return days * 86400;
  }

  static getWeeks(weeks: number) {
    if (weeks < 0) {
      throw new Error('Weeks cannot be negative');
    }

    return weeks * 604800;
  }
}
