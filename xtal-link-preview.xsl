<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="div/header"/>
    </xsl:template>

    <xsl:template match="header">
        <xsl:variable name="href" select="@href"/>
        <xsl:variable name="imgSrc">
            <xsl:call-template name="getImage"></xsl:call-template>
        </xsl:variable>
        <main>
            <label><xsl:value-of select="$href"/></label>
            <xsl:copy>
                <xsl:apply-templates select="//meta-ish"/>
            </xsl:copy>
        </main>
    </xsl:template>

    <xsl:template match="meta-ish[@property='og:image']">
        <img src="{@content}"/>
        <details open="" part="details">
        </details>
    </xsl:template>

    <xsl:template name="getImage">
        <xsl:choose>
            <xsl:when test="//meta-ish[@property='og:image']">
                <xsl:value-of select="//meta-ish[@property='og:image']"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>