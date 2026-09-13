import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  component: TermosDeUso,
});

function TermosDeUso() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="mb-8 inline-block text-sm text-primary hover:underline"
        >
          ← Voltar para a página inicial
        </a>

        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Termos de Uso
        </h1>

        <p className="mb-10 text-sm text-muted-foreground">
          Última atualização: 11 de julho de 2026
        </p>

        <div className="space-y-8 leading-relaxed text-foreground/85">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              1. Sobre estes termos
            </h2>

            <p>
              Estes Termos de Uso estabelecem as condições para acesso,
              aquisição e utilização do material digital “80 Simulados de
              Matemática”, comercializado pelo Prof. Lucas MPC.
            </p>

            <p className="mt-3">
              Ao adquirir ou utilizar o material, o comprador declara que leu,
              compreendeu e concorda com estes termos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Sobre o produto
            </h2>

            <p>
              O produto é composto por 80 simulados de Matemática voltados para
              concursos públicos, acompanhados dos respectivos gabaritos e dos
              conteúdos adicionais informados na página de vendas e no
              checkout.
            </p>

            <p className="mt-3">
              Trata-se de um produto digital. Nenhum material físico será
              enviado ao endereço do comprador.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. Compra e pagamento
            </h2>

            <p>
              A compra e o processamento do pagamento são realizados por meio
              da plataforma Hotmart. As formas de pagamento, parcelamento,
              aprovação e demais condições serão apresentadas no checkout.
            </p>

            <p className="mt-3">
              O acesso ao produto será disponibilizado após a confirmação do
              pagamento pela plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. Acesso ao material
            </h2>

            <p>
              O comprador é responsável por fornecer corretamente seu nome,
              endereço de e-mail e demais informações solicitadas durante a
              compra.
            </p>

            <p className="mt-3">
              Problemas de acesso devem ser comunicados pelo canal de contato
              indicado ao final desta página.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. Uso individual
            </h2>

            <p>
              A compra concede ao aluno uma licença pessoal, limitada e não
              transferível para utilizar o material em seus próprios estudos.
            </p>

            <p className="mt-3">
              Não é permitido revender, distribuir, compartilhar, copiar,
              disponibilizar publicamente ou utilizar o conteúdo para fins
              comerciais sem autorização expressa do responsável.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              6. Reembolso
            </h2>

            <p>
              O comprador poderá solicitar o cancelamento e o reembolso dentro
              do prazo de garantia informado na página de vendas e no checkout,
              atualmente estabelecido em 7 dias corridos após a compra.
            </p>

            <p className="mt-3">
              A solicitação poderá ser realizada diretamente pela plataforma
              Hotmart ou pelo canal de atendimento disponibilizado neste site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              7. Resultados
            </h2>

            <p>
              O material tem finalidade educacional e de preparação para
              concursos públicos. A aquisição não representa garantia de
              aprovação, classificação, nomeação ou obtenção de resultado
              específico.
            </p>

            <p className="mt-3">
              Os resultados dependem, entre outros fatores, da dedicação, da
              prática e das condições individuais de cada aluno.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              8. Propriedade intelectual
            </h2>

            <p>
              Os textos, questões, explicações, elementos visuais, materiais e
              demais conteúdos disponibilizados estão protegidos pela
              legislação aplicável de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              9. Alterações
            </h2>

            <p>
              Estes termos poderão ser atualizados para refletir alterações no
              produto, na plataforma ou na legislação. A versão mais recente
              permanecerá disponível nesta página.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              10. Contato
            </h2>

            <p>
              Para dúvidas, suporte ou solicitações relacionadas ao produto,
              entre em contato pelo WhatsApp:
            </p>

            <a
              href="https://wa.me/5511960189699?text=Ol%C3%A1%2C%20professor%20Lucas.%20Preciso%20de%20ajuda%20com%20os%2080%20Simulados."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-primary hover:underline"
            >
              (11) 96018-9699
            </a>
          </section>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          © 2026 Prof. Lucas MPC. Todos os direitos reservados.
        </div>
      </div>
    </main>
  );
}
