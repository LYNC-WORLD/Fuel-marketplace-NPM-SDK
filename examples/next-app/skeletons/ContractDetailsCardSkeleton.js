export function ContractDetailsCardSkeleton() {
  return (
    <>
      <tr style={{ border: 0 }} className="table-row skeleton">
        <td className="table-data collection-name-container row-start-center">
          <span className="collection-image box aspect-square"></span>
          <span className="collection-name"></span>
        </td>
        <td className="table-data"></td>
        <td className="table-data"></td>
        <td className="table-data"></td>
        <td className="table-data"></td>
      </tr>
    </>
  );
}
