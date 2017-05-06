export default (user, averagePage) => {
  let pageNum = user.pdfStat && user.pdfStat.pageNumber;
  let progress = 'behind';
  if (pageNum != null) {
    progress = pageNum < averagePage - 2 ? 'behind' :
      (pageNum > averagePage + 2 ? 'ahead' : 'on-track');
  }
  return { ...user, progress }
}
