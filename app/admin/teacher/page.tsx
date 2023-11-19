import { DataTable } from "@/components/data-table";
import { ITeacher } from "@/lib/models";
import { columns } from "./_components/column";

const TeacherListPage = () => {
  const teachers: ITeacher[] = [
    {
      id: "1",
      name: "Ashwani",
      email: "ashwanikumar3811@gmail.com",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={teachers}
      searchPlaceholder={"Filter teachers...."}
      filterColumn={"name"}
    />
  );
};

export default TeacherListPage;
