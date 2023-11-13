"use client";

const CourseDetailPage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  return <p>CourseDetailPage - {params.courseId}</p>;
};

export default CourseDetailPage;
